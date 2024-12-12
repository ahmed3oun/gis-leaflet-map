import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgVibeDrawer } from '@ng-vibe/drawer';
import { routes } from './app.routes';
import { EasyStateManagerService } from "ngx-easy-state-manager";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNgVibeDrawer(),
    provideRouter(routes),
    EasyStateManagerService
  ]
};
