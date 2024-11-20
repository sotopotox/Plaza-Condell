import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

interface Reserva {
  id?: string;
  date: string;
  user: string;
}

@Component({
  selector: 'app-gym-reservation',
  templateUrl: './gym-reservation.page.html',
  styleUrls: ['./gym-reservation.page.scss'],
})
export class GymReservationPage implements OnInit {
  selectedDate: string = '';
  minDate: string;
  highlightedDates: { date: string, color: string }[] = [];
  reservationsList: Reserva[] = [];
  currentUserEmail: string | null = null;
  maxReservationsPerMonth = 1;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.currentUserEmail = user.email || '';
      }
      this.loadReservedDates();
    });
  }

  async loadReservedDates() {
    const snapshot = await this.firestore.collection<Reserva>('reservas').get().toPromise();
    if (snapshot && snapshot.docs) {
      this.highlightedDates = snapshot.docs.map(doc => {
        const data = doc.data() as Reserva;
        return { date: data.date, color: 'red' };
      });

      this.reservationsList = snapshot.docs.map(doc => {
        const data = doc.data() as Reserva;
        return { id: doc.id, date: data.date, user: data.user };
      });
    }
  }

  async reservar() {
    if (!this.selectedDate) {
      this.showToast('Por favor, selecciona una fecha para la reserva.');
      return;
    }

    if (await this.isDateReserved(this.selectedDate)) {
      this.showToast('Esta fecha ya está reservada. Selecciona otra fecha.');
      return;
    }

    if (await this.hasReachedMonthlyLimit()) {
      this.showToast('Ya has alcanzado el límite de reservas para este mes.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Reservando...',
      spinner: 'crescent'
    });

    try {
      await loading.present();
      await this.firestore.collection('reservas').add({
        date: this.selectedDate,
        user: this.currentUserEmail
      });

      this.showToast('¡Reserva realizada con éxito!');
      this.loadReservedDates();
      this.selectedDate = '';
    } catch (err) {
      console.error('Error al reservar:', err);
      this.showToast('Error al realizar la reserva.');
    } finally {
      await loading.dismiss();
    }
  }

  async cancelarReserva(id: string) {
    const loading = await this.loadingController.create({
      message: 'Eliminando...',
      spinner: 'crescent'
    });

    try {
      await loading.present();
      await this.firestore.collection('reservas').doc(id).delete();
      this.showToast('Reserva cancelada con éxito.');
      this.loadReservedDates();
    } catch (err) {
      console.error('Error al cancelar la reserva:', err);
      this.showToast('Error al cancelar la reserva.');
    } finally {
      await loading.dismiss();
    }
  }

  async isDateReserved(date: string): Promise<boolean> {
    const snapshot = await this.firestore.collection<Reserva>('reservas', ref =>
      ref.where('date', '==', date)
    ).get().toPromise();

    // Verificación segura para evitar el error
    return snapshot?.docs?.length ? snapshot.docs.length > 0 : false;
  }

  async hasReachedMonthlyLimit(): Promise<boolean> {
    if (!this.currentUserEmail) return false;

    const currentMonth = new Date().toISOString().split('-').slice(0, 2).join('-');

    const snapshot = await this.firestore.collection<Reserva>('reservas', ref =>
      ref
        .where('user', '==', this.currentUserEmail)
        .where('date', '>=', `${currentMonth}-01`)
        .where('date', '<=', `${currentMonth}-31`)
    ).get().toPromise();

    return snapshot?.size ? snapshot.size >= this.maxReservationsPerMonth : false;
  }

  onDateChange(event: any) {
    const selected = event.detail.value;
    this.selectedDate = selected;
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
