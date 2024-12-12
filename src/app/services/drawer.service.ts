import { Injectable } from '@angular/core';
import { DrawerPosition, DrawerRemoteControl } from '@ng-vibe/drawer';
import { EasyStateManagerService } from 'ngx-easy-state-manager';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  drawer: DrawerRemoteControl;

  constructor(private readonly stateManager: EasyStateManagerService) {
    this.drawer = this.stateManager.getState('drawer')!
  }

  openDrawer(optionalPayload?: any) {
    this.drawer.options = {
      position: DrawerPosition.RIGHT,
      showOverlay: true,
      height: '200',
      width: '50'
    };
    this.drawer.openDrawer(optionalPayload)
  }

  closeDrawer() {
    this.drawer.closeDrawer();
  }

}
