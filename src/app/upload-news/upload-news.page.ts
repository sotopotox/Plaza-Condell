import { Component } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-news',
  templateUrl: './upload-news.page.html',
  styleUrls: ['./upload-news.page.scss'],
})
export class UploadNewsPage {
  selectedFile: any = null;
  description: string = '';

  constructor(private newsService: NewsService, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = reader.result;
    };
    reader.readAsDataURL(file);
  }

  uploadNews() {
    if (this.selectedFile && this.description) {
      this.newsService.addNews(this.selectedFile, this.description).then(() => {
        alert('Noticia subida con éxito');
        this.description = '';
        this.selectedFile = null;
        this.router.navigate(['/home']); // Redirige al home después de subir la noticia
      });
    } else {
      alert('Por favor, selecciona una imagen y escribe una descripción.');
    }
  }
}
