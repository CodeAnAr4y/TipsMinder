import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber',
})
export class CardNumberPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.match(/.{1,4}/g)?.join(' ') || '';
  }
}
