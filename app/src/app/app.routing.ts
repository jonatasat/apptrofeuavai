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
import { UsersComponent } from './users/users.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'players', component: PlayersComponent, canActivate: [AuthGuard] },
    { path: 'newplayer', component: AddPlayerComponent, canActivate: [AuthGuard]},
    { path: 'editplayer', component: EditPlayerComponent, canActivate: [AuthGuard]},
    { path: 'team', component: TeamComponent, canActivate: [AuthGuard]},
    { path: 'addteam', component: AddTeamComponent, canActivate: [AuthGuard]},
    { path: 'editteam', component: EditTeamComponent, canActivate: [AuthGuard]},
    { path: 'matches', component: MatchesComponent, canActivate: [AuthGuard]},
    { path: 'addmatch', component: AddMatchComponent, canActivate: [AuthGuard]},
    { path: 'matches/editmatches/:id', component: EditMatchComponent, canActivate: [AuthGuard]},
    { path: 'editplayersmatch', component: EditPlayersMatchComponent, canActivate: [AuthGuard]},
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
    { path: 'addusers', component: AddUsersComponent, canActivate: [AuthGuard]},
    { path: 'users/editusers/:id', component: EditUsersComponent, canActivate: [AuthGuard]},
    { path: 'login', component:LoginComponent},
    { path: '**', component: PagenotfoundComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);