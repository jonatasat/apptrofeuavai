import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'players', component: PlayersComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);