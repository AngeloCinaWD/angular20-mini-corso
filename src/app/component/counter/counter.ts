import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  counter: WritableSignal<number> = signal<number>(0);

  increaseCounter(): void {
    this.counter.update((counter: number): number => counter + 1);
  }
}
