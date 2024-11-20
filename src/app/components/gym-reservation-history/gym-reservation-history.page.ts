import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';

interface Reserva {
  id: string;
  date: string;
  user: string;
}

@Component({
  selector: 'app-gym-reservation-history',
  templateUrl: './gym-reservation-history.page.html',
  styleUrls: ['./gym-reservation-history.page.scss'],
})
export class GymReservationHistoryPage implements OnInit {
  reservations$: Observable<Reserva[]>;

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.reservations$ = this.firestore.collection<Reserva>('reservas').valueChanges({ idField: 'id' });
  }

  ngOnInit() {}

  async deleteReservation(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            // Mostrar el spinner de carga
            const loading = await this.loadingController.create({
              message: 'Eliminando...',
              spinner: 'crescent',
              duration: 3000 // Tiempo máximo en milisegundos antes de ocultar el spinner automáticamente
            });
            await loading.present();

            try {
              await this.firestore.collection('reservas').doc(id).delete();
              console.log('Reserva eliminada:', id);
            } catch (error) {
              console.error('Error eliminando la reserva:', error);
            } finally {
              // Ocultar el spinner después de eliminar la reserva
              await loading.dismiss();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
