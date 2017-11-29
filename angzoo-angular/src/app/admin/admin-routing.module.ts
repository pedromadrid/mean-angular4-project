import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



//Components
import { MainComponent } from './components/main/main.component';;
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

// Guards
import { AdminGuard } from '../services/admin.guard'


const adminRoutes: Routes = [

	{
		path: 'admin-panel',
		component: MainComponent,
		canActivate: [AdminGuard],
		children: [
			{path: '' ,redirectTo: 'listado', pathMatch: 'full'},
			{path: 'listado' ,component: ListComponent},
			{path: 'añadir' ,component: AddComponent},
			{path: 'editar/:id' ,component: EditComponent},
		]


	}
]

@NgModule({
	imports:[
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	]
})

export class AdminRoutingModule{

}