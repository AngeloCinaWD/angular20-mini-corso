import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, argomento1: number, argomento2: number[], ...args: unknown[]): string {
    // trasformo una stringa in capitalizzata, cioè la prima maiuscola e tutte le altre minuscole
    console.log(argomento1);
    console.log(argomento2);
    console.log(...args);
    console.log(args);

    return `${value.charAt(0).toUpperCase()}${value
      .slice(1)
      .toLowerCase()} ${argomento1} ${argomento2} ${args[0]}`;
  }
}
