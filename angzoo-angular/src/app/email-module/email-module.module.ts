import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Importar componentes
import { saveEmailComponent } from './components/save-email/save-email.component';
import { showEmailComponent } from './components/show-email/show-email.component';
import { mainEmailComponent } from './components/main-email/main-email.component';

// Decorar ngModule pra cargar componentes y configuración
@NgModule({
	imports: [CommonModule, FormsModule],
	declarations: [
		saveEmailComponent,
		showEmailComponent,
		mainEmailComponent
	],
	exports : [
		mainEmailComponent
	]
		
})


export class emailModuleModule{}

