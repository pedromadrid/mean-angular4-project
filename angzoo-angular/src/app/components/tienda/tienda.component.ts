import {Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/core';
import { fadeIn } from '../animation';

@Component({
	selector: 'tienda',
	templateUrl: './tienda.component.html',
	styleUrls: ['./tienda.component.css'],
	animations: [fadeIn,
		trigger('marcar',[
			state('inactive',style({
				border: '5px solid #ccc',
				color: 'black'
			})),
			state('active', style({
				border: '5px solid yellow',
				background: 'red',
				borderRadius: '50px',
				transform: 'scale(1.2,1)'
			})),
			transition ('inactive => active', animate('200ms linear')),
			transition ('active => inactive', animate('200ms linear')),

			])
	]
	})
export class TiendaComponent implements OnInit{
	public titulo;
	public nombreDelParque:string;
	public miParque;
	public state;


	constructor(){
		this.titulo = 'Esta es la tienda'
		this.state = 'inactive'
	}

	mostrarNombre(){
		console.log(this.nombreDelParque);
	}

	verDatosParque(event){
		console.log(event)
		this.miParque = event;
	}

	ngOnInit(){
		$('#textojq').hide();
		$('#botonjq').click(function() {
			$('#textojq').slideToggle();
		})
		$('#caja').dotdotdot({});
	}

	keyupHandlerFunction(content){
		console.log(content);
	}
	activar(){
		console.log(this.state);
		if (this.state=='active')
			this.state='inactive';
		else
			this.state='active';
		console.log(this.state)
	}
}