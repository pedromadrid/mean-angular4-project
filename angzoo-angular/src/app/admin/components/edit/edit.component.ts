import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Animal } from '../../../models/animal';
import { User } from '../../../models/user';
import { AnimalService } from '../../../services/animal.service';
import { UserService } from '../../../services/user.service';
import { UploadService } from '../../../services/upload.service';
import { fadeLateral } from '../../animations';

@Component({
  selector: 'edit-admin',
  templateUrl: './edit.component.html',
    providers: [UserService, AnimalService, UploadService],
    animations: [fadeLateral]
})
export class EditComponent implements OnInit{
  public title:string;
  public animal:Animal;
  public identity;
  public token;
  public url: string;
  public message: string;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService : UserService,
  	private _animalService: AnimalService,
  	private _uploadService: UploadService

  	){
  	this.title = 'editar Animal';
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.url = GLOBAL.url;
  	this.animal = new Animal('','','',2017,'',new User('','','','','','',''));

  }

  ngOnInit(){
  	console.log('inicia el on init')
  	this.getAnimal();
  	console.log('termina el on init')
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

  onSubmit(){
  	var id = this.animal._id;

  	this._animalService.editAnimal(this.token,this.animal).subscribe(
  		response =>{
  			if (response.animal && response.animal._id){
  				this.message = 'success';
  				this.animal=response.animal;
  				//subida de la imagen
  				if (this.filesToUpload){
  					this._uploadService.makeFileRequest(this.url+'/animals/'+this.animal._id+'/upload', [] , this.filesToUpload, this.token, 'image')
                    .then((result:any)=>{
                      this.animal.image = result.animal.image;
                      console.log('pre-redirect');
                      this._router.navigate(['/animal',this.animal._id]);
                    })
  				}
  				else{
                      this._router.navigate(['/animal',this.animal._id]);
  				}
  				 				
  				
  			} else{
  				this.message = 'error';
  			}
  			
  			
  		},
  		error => {
  			var errorMsg = <any>error;
  			if (errorMsg != null){
  				this.message='error'
  				console.log(errorMsg);
  			}
  		})
  	}

  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
