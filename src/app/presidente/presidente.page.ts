import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-presidente',
  templateUrl: './presidente.page.html',
  styleUrls: ['./presidente.page.scss'],
})
export class PresidentePage implements OnInit {
  isAdmin = false;
  palabras: string = '';
  editMode = false;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    // Verificar si el usuario es administrador
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.authService.getUserRole(user.uid).subscribe(role => {
          this.isAdmin = role === 'admin';
        });
      }
    });

    // Cargar palabras del presidente desde Firestore
    this.loadPalabras();
  }

  loadPalabras() {
    this.firestore
      .collection('presidente')
      .doc('palabras')
      .valueChanges()
      .subscribe((data: any) => {
        this.palabras = data?.contenido || 'No hay palabras del presidente aún.';
      });
  }

  savePalabras() {
    if (this.isAdmin) {
      this.firestore
        .collection('presidente')
        .doc('palabras')
        .set({ contenido: this.palabras })
        .then(() => {
          alert('Palabras guardadas con éxito.');
          this.editMode = false;
        })
        .catch(err => {
          console.error('Error al guardar las palabras:', err);
        });
    }
  }
}
