import { Component } from '@angular/core';

@Component({
  selector: 'app-cabinets',
  templateUrl: './cabinets.component.html',
  styleUrls: ['./cabinets.component.scss'],
})
export class CabinetsComponent {
  cabinets: any[] = [
    {
      number: 1,
      seats: 20
    },
    {
      number: 2,
      seats: 100
    },
    {
      number: 3,
      seats: 30
    },
  ];
  
}
