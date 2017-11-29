import { Component } from '@angular/core';

@Component({
  selector: 'save-email',
  template: `
    <h3>{{title}}</h3>
    <input type="text" [(ngModel)]="emailContacto">
    <button (click)="guardarEmail()">Guardar email</button>
  `
})
export class saveEmailComponent {
  title = 'Guardar email';
  emailContacto:string;

  guardarEmail(){
  localStorage.setItem('emailContacto',this.emailContacto);
  console.log(localStorage.getItem('emailContacto'));
  }

}
