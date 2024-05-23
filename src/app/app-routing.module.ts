import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlannerComponent } from './components/planner/planner.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Mission Planner',
    },
  },
  {
    path: 'planner',
    component: PlannerComponent,
    data: {
      title: 'Planner',
    },
  },
  {
    path: 'player',
    component: PlayerComponent,
    data: {
      title: 'Player',
    },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
