import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${this.addZeros(minutes)}:${this.addZeros(seconds)}`;
  }

  addZeros(value: number): string {
    const stringVal = value.toString(10);
    return stringVal.length === 1 ? `0${stringVal}` : stringVal;
  }
}
