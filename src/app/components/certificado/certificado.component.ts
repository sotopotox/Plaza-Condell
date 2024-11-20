import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.scss']
})
export class CertificadoComponent {
  constructor(private router: Router) {}

  downloadCertificado() {
    const certificadoUrl = 'assets/certificado_residencia.pdf'; // Ruta al archivo PDF
    const link = document.createElement('a');
    link.href = certificadoUrl;
    link.target = '_blank'; // Abre en una nueva pestaña (opcional)
    link.download = 'Certificado_Residencia_Plaza_Condell.pdf'; // Nombre al descargar
    link.click();
  }

  goBackToHome() {
    this.router.navigate(['/home']);
  }
}
