import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeIn]
})
export class HomeComponent implements OnInit {

	public title = 'Esto es una prueba del stack MEAN';

  constructor() { }

  ngOnInit() {
  	console.log('home.component cargado!');
  }

}
