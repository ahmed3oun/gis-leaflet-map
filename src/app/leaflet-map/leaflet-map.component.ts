import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import L, { map, Map, tileLayer } from 'leaflet';
import { MarkerService } from './marker.service';
import { ShapeService } from './shape.service';
import { DrawerRemoteControl } from '@ng-vibe/drawer';
import { ToolsBarComponent } from '../components/tools-bar/tools-bar.component';
import { EasyStateManagerService } from 'ngx-easy-state-manager';
import { DrawerService } from '../services/drawer.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
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
L.Marker.prototype.options.icon = iconDefault

const provideDrawer = (): DrawerRemoteControl => new DrawerRemoteControl(ToolsBarComponent);

@Component({
  selector: 'app-leaflet-map',
  imports: [ToolsBarComponent],
  standalone: true,
  templateUrl: './leaflet-map.component.html',
  providers: [MarkerService],
  styleUrls: ['../../../node_modules/leaflet/dist/leaflet.css', './leaflet-map.component.css']
})
export class LeafletMapComponent implements AfterViewInit {
  @ViewChild('map')
  mapElementRef: ElementRef = null!
  private map: Map = null!
  private states: any;
  drawer: DrawerRemoteControl = provideDrawer()


  constructor(
    private readonly markerService: MarkerService,
    private readonly shapeService: ShapeService,
    private readonly easyStateManager: EasyStateManagerService,
    private readonly drawerService: DrawerService,
  ) {
    this.easyStateManager.assignState("isDrawerOpen", false)
    this.easyStateManager.assignState("drawer", this.drawer)
  }

  openDrawerBar() {
    this.drawerService.openDrawer();
    this.easyStateManager.assignState("isDrawerOpen", true)
  }

  async ngAfterViewInit() {
    this.initMap();
    await this.markerService.makeCapitalMarkers(this.map);
    await this.markerService.makeCapitalCircleMarkers(this.map)
    this.states = await this.shapeService.getStateShapes()
    this.initStatesLayer()
  }

  private initMap() {
    this.map = map(this.mapElementRef.nativeElement)
      .setView([39.8282, -98.5795], 4);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 30,
      attribution: '&copy; OpenStreetMap'
    }).addTo(this.map)
  }

  private highlightFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 10,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }

  private resetFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B'
    });
  }

  private initStatesLayer() {
    const stateLayer = L.geoJSON(this.states, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.8,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B',
      }),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
        })
      )
    });

    this.map.addLayer(stateLayer);
    stateLayer.bringToBack();
  }
}
