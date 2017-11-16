import { Component, OnInit} from '@angular/core';
import { TogglesidebarService } from '../togglesidebar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {

  title = '';

  constructor(private service:TogglesidebarService) {
  }

  ngOnInit() {
    this.title = 'Troféu Avai';
  }

  toggleMenu(){
    this.service.toggleSidebar('toggled');
  }

}
