import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations: [fadeIn]
})
export class ContactsComponent implements OnInit {

	public title = 'Contacto';
	public emailContacto:string;

  constructor() { }

  ngOnInit() {
  	console.log('contacts.component cargado!');
  }

  guardarEmail(){
	localStorage.setItem('emailContacto',this.emailContacto);
	console.log(localStorage.getItem('emailContacto'));
  }

}
