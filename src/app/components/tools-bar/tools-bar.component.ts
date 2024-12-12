import { Component, OnInit } from '@angular/core';
import { EasyStateManagerService } from 'ngx-easy-state-manager';
import { DrawerService } from '../../services/drawer.service';

@Component({
  selector: 'app-tools-bar',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './tools-bar.component.html',
  styleUrl: './tools-bar.component.css'
})
export class ToolsBarComponent implements OnInit {

  constructor(
    private readonly easyStateManager: EasyStateManagerService,
    private readonly drawerService: DrawerService
  ) { }

  ngOnInit(): void { }

  closeDrawerBar() {
    this.drawerService.closeDrawer();
    this.easyStateManager.assignState("isDrawerOpen", false);
  }
}
