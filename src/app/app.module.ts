import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {DatePipe} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './features/auth/auth.module';
import {AuthInterceptor} from './services/auth-services/auth.interceptor';
import {AuthEffects} from './store/auth-store/auth.effect';
import {authReducer} from './store/auth-store/auth.reducer';
import {HeaderModule} from './features/header/header.module';
import {MaintenanceModule} from './features/maintenance/maintenance.module';
import {PlannerModule} from './features/planner/planner.module';
import {plannerReducer} from './store/planner-store/planner-store.reducer';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from "./shared/material/material.module";
import {PlannerEffects} from "./store/planner-store/planner-store.effects";
import {lessonsReducer} from "./store/lessons-store/lesson.reducer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    PlannerModule,
    SharedModule,
    MaintenanceModule,
    MaterialModule,
    StoreModule.forRoot({auth: authReducer, planner: plannerReducer, lesson: lessonsReducer}),
    EffectsModule.forFeature(PlannerEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      // logOnly: environment.production,
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
