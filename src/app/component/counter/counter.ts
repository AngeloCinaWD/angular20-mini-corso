import {
  Component,
  effect,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter implements OnInit {
  // utilizzo della funzione signal input() per passare dati dall'esterno, al posto del decoratore @Input
  // dopo il valore iniziale posso passare un oggetto con le proprietà alias e transform che è una funzione per modificare il valore passato dal padre
  title: InputSignal<string> = input<string>('Default Counter component');

  numeroDalPadre: InputSignal<number> = input(0, {
    alias: 'numero',
    transform: (value: number) => value * 3,
  });
  // input required, se è obbligatorio non c'è bisogno di un valore di default
  inputObbligatorio: InputSignal<string> = input.required({
    transform: (value: string) => value.toUpperCase(),
  });

  counter: WritableSignal<number> = signal<number>(0);

  // tramite hook ngoninit setto il valore iniziale del counter tramite input esterno
  initialCounter: InputSignal<number> = input(0);

  // per fare in modo che counter cambi valore al click che chiama la funzione nel padre devo utilizzare effect() nel costruttore
  constructor() {
    // è una specie di computed generale sempre attiva
    // in questo caso ogni volta che dal padre incremento il valore di initialCounter effect reagirà settando counter
    effect(() => {
      this.counter.set(this.initialCounter());
    });
  }

  // viene chiamato dopo che angular ha costruito tutti gli input() quindi ha tutti i loro valori e dopo il constructor
  // quindi questa cosa non può essere fatta nel constructor perchè gli input vengono inizializzati dopo
  // il codice in ngoninit viene eseguito solo una volta, quindi il valore di counter viene settato una sola volta
  ngOnInit(): void {
    this.counter.set(this.initialCounter());
  }

  increaseCounter(): void {
    this.counter.update((counter: number): number => counter + 1);
  }
}
