import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stock'
})
export class StockPipe implements PipeTransform {

  transform(value: string): string {
    return value === 'INSTOCK' ? '尚有庫存' : value === 'LOWSTOCK' ? '少量存貨' : '無庫存';
  }

}
