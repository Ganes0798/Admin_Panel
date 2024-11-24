import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders = [
    { id: 675902, date: new Date('2024-01-17'), items: 10, price: 876, paid: true, address: 'Beaverton, OR 97005', status: 'Complete' },
    { id: 675909, date: new Date('2024-02-01'), items: 22, price: 2100, paid: false, address: 'Savannah, GA 31404', status: 'Pending' },
    { id: 675912, date: new Date('2024-02-02'), items: 12, price: 3200, paid: false, address: 'Tucson, AZ 85756', status: 'Cancelled' },
    // Add more orders...
  ];

  paginationPages = [1, 2, 3, 4, 5];

  getStatusClass(status: string) {
    switch (status) {
      case 'Complete': return 'text-success';
      case 'Pending': return 'text-warning';
      case 'Cancelled': return 'text-danger';
      default: return '';
    }
  }

}
