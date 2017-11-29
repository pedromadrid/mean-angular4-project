import { ModuleWithProviders } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { TiendaComponent } from './components/tienda/tienda.component';
import { HomeComponent } from './components/home/home.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { KeepersComponent } from './components/keepers/keepers.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AnimalDetailComponent } from './components/animal-detail/animal-detail.component';


const appRoutes: Routes = [
	//{path: '', component: HomeComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: 'home', component: HomeComponent},
	{path: 'animales', component: AnimalsComponent},
	{path: 'contacto', component: ContactsComponent},
	{path: 'cuidadores', component: KeepersComponent},
	{path: 'tienda', component: TiendaComponent},
	{path: 'registro', component: RegisterComponent},
	{path: 'login', component: LoginComponent},
	{path: 'mis-datos', component: UserInfoComponent},
	{path: 'animal/:id', component: AnimalDetailComponent},
	{path: '**', component: HomeComponent},

];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);