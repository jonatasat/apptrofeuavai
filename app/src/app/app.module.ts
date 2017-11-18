import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TogglesidebarService } from './togglesidebar.service';
import { PlayersComponent } from './players/players.component';
import { HomeComponent } from './home/home.component';
import { AddPlayerComponent } from './players/add-player/add-player.component';
import { EditPlayerComponent } from './players/edit-player/edit-player.component';
import { TeamComponent } from './team/team.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    PlayersComponent,
    HomeComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    TeamComponent,
    AddTeamComponent,
    EditTeamComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [TogglesidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
