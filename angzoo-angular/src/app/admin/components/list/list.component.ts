import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Animal } from '../../../models/animal';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { fadeLateral } from '../../animations';

@Component({
  selector: 'list-admin',
  templateUrl: './list.component.html',
    providers: [AnimalService, UserService],
    animations: [fadeLateral]
})
export class ListComponent implements OnInit {
  public title:string;
  public url: string;
  public animals: Animal[];
  public token;
  public busqueda;

   constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _animalService: AnimalService,
    private _userService : UserService

  	){
  	this.title = 'Añadir Animal';
  	this.url = GLOBAL.url;
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    this.getAnimals();
  }


  getAnimals(){
  	this._animalService.getAnimals().subscribe(
  		response =>{
  			if (!response.animals){

  			}else{
  				this.animals = response.animals;
  			}
  		},
  		error =>{
  			console.log(<any>error);
  		})
  }

  deleteAnimal(id){
    $('#modalDelete-'+id).modal('hide');
    this._animalService.deleteAnimal(this.token, id).subscribe(
      response =>{
        if (!response.animal){
          console.log('no retornó animal')
          this.getAnimals();
        }else{
          this.getAnimals();
        }
      },
      error =>{
        console.log('se fue por error'+<any>error);
      })
  }
  

}
