import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from './material/material.module';
import { SharedService } from './services/shared.service';
import { SharedEffects } from './shared-store/shared-store.effects';
import { sharedReducer } from './shared-store/shared-store.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('shared', sharedReducer),
    EffectsModule.forFeature(SharedEffects),
  ],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule],
  providers: [SharedService],
})
export class SharedModule {}
