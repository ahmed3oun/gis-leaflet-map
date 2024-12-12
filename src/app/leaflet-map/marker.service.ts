import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { lastValueFrom } from 'rxjs';
import { PopUpService } from './pop-up.service';
import capitals from '../../assets/capitals-usa.json'

const iconRetinaUrl = 'assets/images/marker-icon-2x.png';
const iconUrl = 'assets/images/marker-icon.png';
const shadowUrl = 'assets/images/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  response: any;
  constructor(private readonly popupService: PopUpService) { }

  async makeCapitalMarkers(map: L.Map) {
    try {
      this.response = capitals
      for (const c of this.response.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const marker = L.marker([lat, lon]);

        marker.addTo(map);
      }
    } catch (error: any) {
      console.error(error.message);
      this.response = capitals;
    }
  }

  async makeCapitalCircleMarkers(map: L.Map) {
    const maxVal = Math.max(...this.response.features.map((x: any) => x.properties.population), 0);
    try {
      for (const c of this.response.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const circle: L.Circle = L.circle([lon, lat], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 2,
          fillRule: 'inherit',
          radius: 30,
          weight: (c.properties.population * 100) / maxVal
        });

        circle.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        circle.addTo(map);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
