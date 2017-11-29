import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from   '@angular/http';
import { routing, AppRoutingProviders } from "./app.routing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

//Importar modulos custom
import { emailModuleModule } from './email-module/email-module.module';
import { AdminModule } from './admin/admin.module';



//Componentes
import { AppComponent } from './app.component';
import { SimpleTinyComponent } from './components/simple-tiny/simple-tiny.component';

import { TiendaComponent } from './components/tienda/tienda.component';
import { ParquesComponent} from './components/parques/parques.component';
import { HomeComponent } from './components/home/home.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { KeepersComponent } from './components/keepers/keepers.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AnimalDetailComponent } from './components/animal-detail/animal-detail.component';




@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    HomeComponent,
    AnimalsComponent,
    KeepersComponent,
    ContactsComponent,
    SimpleTinyComponent,
    LoginComponent,
    RegisterComponent,
    UserInfoComponent,
    AnimalDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    emailModuleModule,
    AdminModule

  ],
  providers: [AppRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
