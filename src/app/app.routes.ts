import { Routes } from '@angular/router';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

export const routes: Routes = [
  { path: 'map', component: LeafletMapComponent },
  { path: '**', redirectTo: '/map', pathMatch: 'full' }
];
