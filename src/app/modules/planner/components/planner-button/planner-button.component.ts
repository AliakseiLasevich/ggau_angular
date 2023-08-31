import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-planner-button',
  templateUrl: './planner-button.component.html',
  styleUrls: ['./planner-button.component.scss'],
})
export class PlannerButtonComponent {
  @Input() dto: PlannerButtonDto;
}

export interface PlannerButtonDto {
  color: string;
  logo: string;
  description: string;
  orderTime: string;
  onClickFunction: Function;
}
