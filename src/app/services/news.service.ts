import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { News } from '../models/news.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private firestore: AngularFirestore) {}

  // Recuperar noticias
  getNews(): Observable<News[]> {
    return this.firestore
      .collection<News>('news')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as News;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  // Guardar nueva noticia
  async addNews(imageBase64: string, description: string): Promise<void> {
    await this.firestore.collection('news').add({
      imageBase64,
      description,
    });
  }

  // Eliminar una noticia
  async deleteNews(id: string): Promise<void> {
    await this.firestore.collection('news').doc(id).delete();
  }
}
