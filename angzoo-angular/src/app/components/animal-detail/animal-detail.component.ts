import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Animal } from '../../models/animal';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css'],
  providers: [AnimalService]
})
export class AnimalDetailComponent implements OnInit {
 public title:string;
  public url: string;
  public animal: Animal;

   constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _animalService: AnimalService
  	){
  	this.title = 'Detalles de Animal';
  	this.url = GLOBAL.url;
  	this.animal= new Animal('','','',0,'','');
  }

  ngOnInit(){
    console.log('inicia el on init de detail');
    this.getAnimal();
    console.log('termina el on init de detail');
  	
  }

  getAnimal(){
    this._route.params.forEach((params: Params) =>{
      let id= params['id'];
      this._animalService.getAnimal(id).subscribe(
        response => {
          
          if(response.animal){
            this.animal=response.animal;
          }else{
            this._router.navigate(['/home'])
          }

        },
        error =>{
          console.log(<any>error);
          this._router.navigate(['/home'])
        }
      )
    })

  }
}
