import { Pipe, PipeTransform } from '@angular/core';
import { Orders } from '../interfaces/orders';

@Pipe({
  name: 'InputdashBoard',
  standalone:true
})
export class InputdashBoardPipe implements PipeTransform {
  transform(allOrders: Orders[], word: string): Orders[] {
    return allOrders.filter((user) => {
      return (
        user.user.name.toLowerCase().includes(word.toLowerCase()) ||
        user.user.email.toLowerCase().includes(word.toLowerCase())
      );
    });
  }
}
