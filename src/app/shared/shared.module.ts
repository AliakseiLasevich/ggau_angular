import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './material/material.module';
import { SharedService } from '../services/planner-services/shared.service';
import { SharedEffects } from '../store/planner-store/planner-store.effects';
import { plannerReducer } from '../store/planner-store/planner-store.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    EffectsModule.forFeature(SharedEffects),
  ],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule],
  providers: [SharedService],
})
export class SharedModule {}
