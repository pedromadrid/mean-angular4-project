import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, OnDestroy} from '@angular/core';

@Component({
	selector: 'parques',
	templateUrl: './parques.component.html'
	})
export class ParquesComponent implements OnChanges, OnInit, OnDestroy {
	@Input() nombre: string;
	@Input() metros: number;
	public vegetacion: string;
	public abierto: boolean;

	@Output() pasameLosDatos = new EventEmitter();

	constructor(){
		this.nombre = 'Parque natural';
		this.metros = 450;
		this.vegetacion = 'Alta';
		this.abierto = false;
	}

	ngOnChanges(){
		console.log('changes')
	}

	ngOnInit(){
		console.log('Metodo on init cargado');
	}

	ngOnDestroy(){
		console.log('destroy lanzado')
	}

	
	emitirEvento(){
		this.pasameLosDatos.emit({
			'nombre': this.nombre,
			'metros': this.metros,
			'vegetacion':this.vegetacion,
			'abierto':this.abierto
		});
	}
}