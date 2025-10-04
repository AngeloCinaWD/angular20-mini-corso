import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Post } from '../../interfaces/postInterface';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-http-server',
  imports: [AsyncPipe],
  templateUrl: './http-server.html',
  styleUrl: './http-server.css',
})
export class HttpServer {
  // inietto la classe HttpClient
  http: HttpClient = inject(HttpClient);

  // proprietà signal che conterrà tutti i posts
  posts: WritableSignal<Post[]> = signal([]);

  loading: WritableSignal<boolean> = signal(false);

  placeHolderUrl: string = 'https://jsonplaceholder.typicode.com/posts';

  // metodo per fetchare i posts
  loadPosts(): void {
    this.posts.set([]);
    this.loading.set(true);
    this.http.get<Post[]>(this.placeHolderUrl).subscribe(async (posts) => {
      // simulo un caricamento di 3 secondi andando ad utilizzare async e await e una new Promise
      // la funzione del subscribe deve essere dichiarata async
      // await fa in modo che il codice dopo la promise che abbiamo implementato venga eseguito solo dopo che il settimeout è stato completato
      await new Promise((resolve) => setTimeout(resolve, 3000));

      this.loading.set(false);
      this.posts.set(posts);
    });
  }

  addPost() {
    const newPost: Post = {
      id: 1,
      userId: 1,
      title: 'nuovo post',
      body: 'angular 20 signal',
    };
    this.http
      .post<Post>(this.placeHolderUrl, newPost)
      .subscribe((post) => this.posts.update((oldPosts) => [post, ...oldPosts]));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.loadPosts();
  }
}
