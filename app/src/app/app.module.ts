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
import { MatchesComponent } from './matches/matches.component';
import { SoccerFieldComponent } from './soccer-field/soccer-field.component';
import { AddMatchComponent } from './matches/add-match/add-match.component';
import { EditMatchComponent } from './matches/edit-match/edit-match.component';
import { EditPlayersMatchComponent } from './matches/edit-players-match/edit-players-match.component';
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth-guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaginationService } from './pagination.service'

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
    EditTeamComponent,
    MatchesComponent,
    SoccerFieldComponent,
    AddMatchComponent,
    EditMatchComponent,
    EditPlayersMatchComponent,
    UsersComponent,
    AddUsersComponent,
    EditUsersComponent,
    LoginComponent,
    PagenotfoundComponent,
  ],
  
  imports: [
    BrowserModule,
    routing,
    FormsModule
  ],
  providers: [TogglesidebarService, AuthService, AuthGuard, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
