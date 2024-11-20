import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  isCliente = false;
  newsList: any[] = [];

  constructor(
    public authService: AuthService,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    // Cargar noticias independientemente de la autenticación
    this.loadNews();

    // Verificar autenticación
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.authService.getUserRole(user.uid).subscribe(role => {
          this.isAdmin = role === 'admin';
          this.isCliente = role === 'cliente';
        });
      } else {
        this.resetRoles();
      }
    });
  }

  resetRoles() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isCliente = false;
  }

  logout() {
    this.authService.logout().then(() => {
      this.resetRoles();
      this.router.navigate(['/home']);
    });
  }

  loadNews() {
    this.newsService.getNews().subscribe(news => {
      this.newsList = news;
    });
  }

  deleteNews(id: string) {
    if (this.isAdmin) {
      this.newsService.deleteNews(id).then(() => {
        alert('Noticia eliminada');
        this.loadNews();
      });
    } else {
      alert('No tienes permisos para realizar esta acción.');
    }
  }
}
