//news-management.components.ts
import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.scss']
})
export class NewsManagementComponent implements OnInit {
  selectedFile: File | null = null;
  description: string = '';
  newsList: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getNews().subscribe(news => {
      this.newsList = news;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFile = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  uploadNews() {
    if (this.selectedFile && this.description) {
      this.newsService.addNews(this.selectedFile, this.description).then(() => {
        alert('Noticia subida con éxito');
        this.description = '';
        this.selectedFile = null;
      });
    }
  }

  deleteNews(id: string) {
    this.newsService.deleteNews(id).then(() => {
      alert('Noticia eliminada');
    });
  }
}
