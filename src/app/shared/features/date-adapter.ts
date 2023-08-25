import {MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import { Injectable } from "@angular/core";


@Injectable()
export class CustomDateAdapter extends NativeDateAdapter  {

    //Неделя в дейтпикере начинается с понедельника
    override getFirstDayOfWeek(): number {
     return 1;
   }
}