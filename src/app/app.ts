import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { arrayStudents, Student } from './type/types';
import { STUDENTS } from './data/students';
import { FormsModule } from '@angular/forms';
import { Counter } from './component/counter/counter';
import { Box } from './component/box/box';

@Component({
  selector: 'app-root',
  imports: [FormsModule, Counter, Box],
  // templateUrl: './app.html',
  // templateUrl: './app2.html',
  templateUrl: './app3.html',
  styleUrl: './app.css',
})
export class App {
  counter: WritableSignal<number> = signal<number>(0);

  increaseCounter(): void {
    this.counter.update((valoreCounter: number): number => valoreCounter + 1);
  }

  decreaseCounter(): void {
    this.counter.update((valoreCounter: number): number => valoreCounter - 1);
  }

  resetCounter(value: number): void {
    this.counter.set(value);
  }

  x: number = 6;

  students: WritableSignal<arrayStudents> = signal<arrayStudents>(STUDENTS);

  updateStudent(id: number): void {
    this.students.update((students) =>
      students.map((student) => (student.id === id ? { ...student, name: 'Aggiornato' } : student))
    );
  }

  orderStudentsByRandomNumber() {
    this.students.update((students) => students.sort(() => Math.random() - 0.5));
  }

  students2: WritableSignal<Student[]> = signal<Student[]>([]);

  addStudentInStudents2(): void {
    const newStudent: Student = {
      id: this.students2().length + 1,
      name: `Studente Nome${this.students2().length + 1}`,
      surname: `Studente Cognome${this.students2().length + 1}`,
    };

    this.students2.update((studenti: Student[]): arrayStudents => [...studenti, newStudent]);
  }

  resetStudents2(): void {
    this.students2.set([]);
  }

  text: WritableSignal<string> = signal<string>('');

  text2: WritableSignal<string> = signal<string>('');

  setText2(event: Event) {
    // // controllo che l'elemento da cui arrivi l'event sia un elemento html input in modo da essere sicuri che ci sia la proprietà value
    // if (event.target instanceof HTMLInputElement) {
    //   this.text2.set(event.target.value);
    // }
    // altrimenti avrei potuto utilizzare un'asserzione di typescript per dire ad angular che può essere sicuro che il target dell'event sia un elemento html di tipo input
    this.text2.set((event.target as HTMLInputElement).value);
  }

  computedCounter: Signal<number> = computed<number>((): number => this.counter() * 2);

  startCounter: WritableSignal<number> = signal(100);

  increaseStartCounter(): void {
    this.startCounter.update((value: number) => value + 50);
  }
}
