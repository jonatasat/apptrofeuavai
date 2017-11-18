import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { AddPlayerComponent } from './players/add-player/add-player.component';
import { EditPlayerComponent } from './players/edit-player/edit-player.component';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', component: PlayersComponent },
    { path: 'newplayer', component: AddPlayerComponent},
    { path: 'editplayer', component: EditPlayerComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);