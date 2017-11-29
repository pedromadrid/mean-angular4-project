import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'show-email',
  template: `
    
    <span *ngIf="emailContacto">
      <h3>{{title}}</h3>
      <strong>Email de contacto </strong>{{emailContacto}}
      <button (click)="borrarEmail()">Borrar email</button>
    </span>  

  `
})
export class showEmailComponent implements DoCheck, OnInit{
  title = 'Mostrar email';
  emailContacto:string;
  ngOnInit(){
  	this.emailContacto = localStorage.getItem('emailContacto')
  }

  ngDoCheck(){
  	this.emailContacto= localStorage.getItem('emailContacto')

  }

  borrarEmail(){
  	localStorage.removeItem('emailContacto');
    localStorage.clear();
    this.emailContacto=null;
  }
}
