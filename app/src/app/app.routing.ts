import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { AddPlayerComponent } from './players/add-player/add-player.component';
import { EditPlayerComponent } from './players/edit-player/edit-player.component';
import { TeamComponent } from './team/team.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';
import { HomeComponent } from './home/home.component';
import { MatchesComponent } from './matches/matches.component';
import { AddMatchComponent } from './matches/add-match/add-match.component';
import { EditMatchComponent } from './matches/edit-match/edit-match.component';
import { EditPlayersMatchComponent } from './matches/edit-players-match/edit-players-match.component';


const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', component: PlayersComponent },
    { path: 'newplayer', component: AddPlayerComponent},
    { path: 'editplayer', component: EditPlayerComponent},
    { path: 'team', component: TeamComponent},
    { path: 'addteam', component: AddTeamComponent},
    { path: 'editteam', component: EditTeamComponent},
    { path: 'matches', component: MatchesComponent},
    { path: 'addmatch', component: AddMatchComponent},
    { path: 'editmatch', component: EditMatchComponent},
    { path: 'editplayersmatch', component: EditPlayersMatchComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);