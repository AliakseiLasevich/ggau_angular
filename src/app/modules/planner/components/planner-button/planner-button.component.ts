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
  disabled: boolean;
  color: string;
  logo: string;
  description: string;
  onClickFunction: Function;
}
