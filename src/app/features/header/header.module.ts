import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'src/app/shared/shared.module';
import {HeaderComponent} from './header.component';
import {MaterialModule} from "../../shared/material/material.module";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SharedModule, RouterModule, MaterialModule],
  exports: [HeaderComponent],
})
export class HeaderModule {
}
