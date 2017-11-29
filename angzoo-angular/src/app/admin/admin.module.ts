import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'



//Components
import { MainComponent } from './components/main/main.component';;
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

// Guards
import { AdminGuard } from '../services/admin.guard';
import { UserService } from '../services/user.service';
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
	declarations:[
		MainComponent,
		ListComponent,
		AddComponent,
		EditComponent,
		SearchPipe
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpModule,
		AdminRoutingModule,
		BrowserAnimationsModule
	],
	exports: [
		MainComponent,
		ListComponent,
		AddComponent,
		EditComponent
	],
	providers: [UserService, AdminGuard]

})

export class AdminModule {

}