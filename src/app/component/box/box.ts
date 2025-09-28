import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-box',
  imports: [NgClass, NgStyle],
  templateUrl: './box.html',
  styleUrl: './box.css',
})
export class Box {
  box: boolean = true;

  box3: string = 'box2';

  box4: string = 'box';

  bg: string = 'lightGreen';

  color: string = 'red';

  styleObject: string = `background-color: yellow; color: green`;

  boxSignal: WritableSignal<boolean> = signal(true);

  toggleBackgroundContent2(): void {
    this.boxSignal.update((boxSignal: boolean): boolean => !boxSignal);
  }

  width: WritableSignal<number> = signal<number>(200);

  increaseWidth(valueIncrease: number) {
    this.width.update((width: number): number => width + valueIncrease);
  }

  decreaseWidth(valueDecrease: number) {
    this.width.update((width: number): number => width - valueDecrease);
  }

  isPrimary: WritableSignal<boolean> = signal(true);
  isDanger: WritableSignal<boolean> = signal(false);

  changeStatusButton() {
    this.isPrimary.update((isPrimary) => !isPrimary);
    this.isDanger.update((isDanger) => !isDanger);
  }

  objectNgClass: Signal<{ [key: string]: boolean }> = computed((): { [key: string]: boolean } => {
    return { btn: true, 'btn-primary': this.isPrimary(), 'btn-danger': this.isDanger() };
  });

  objectNgStyle: { [key: string]: string } = {
    width: '100px',
    height: '100px',
    'background-color': 'yellow',
    color: 'black',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'margin-top': '30px',
  };
}
