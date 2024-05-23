import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HomeComponent } from './components/home/home.component';
import { PlannerComponent } from './components/planner/planner.component';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PointsService } from './services/points.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, PlannerComponent, PlayerComponent, NavbarComponent],
  imports: [BrowserModule, ReactiveFormsModule, MaterialModule, AppRoutingModule],
  providers: [provideAnimationsAsync(), PointsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
