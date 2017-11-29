import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
  animations: [fadeIn],
  providers: [AnimalService]
})
export class AnimalsComponent implements OnInit {

  public title:string;
  public animals: Animal[];
  public url:string;

  constructor(
  	private _animalService: AnimalService
  	) {
  	this.title = 'Añadir Animal'; 
  	this.url = GLOBAL.url;
  }

  ngOnInit() {
  	this.getAnimals();
  	console.log('cargado animales')
  }

  getAnimals(){
  	this._animalService.getAnimals().subscribe(
  		response =>{
  			console.log(response)
  			if (!response.animals){

  			}else{
  				this.animals = response.animals;
  				
  			}
  		},
  		error =>{
  			console.log(<any>error);
  		})
  }

}
