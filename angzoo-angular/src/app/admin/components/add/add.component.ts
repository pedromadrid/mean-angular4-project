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
  selector: 'add-admin',
  templateUrl: './add.component.html',
  providers: [UserService, AnimalService, UploadService],
  animations: [fadeLateral]
})
export class AddComponent implements OnInit{
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
  	this.title = 'Añadir Animal';
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.url = GLOBAL.url;
  	this.animal = new Animal('','','',2017,'', new User('','','','','','',''));

  }

  ngOnInit(){
  	console.log('animal add component cargado')
  }

	onSubmit(addForm){
  	this._animalService.addAnimal(this.token,this.animal).subscribe(
  		response =>{
  			if (response.animal && response.animal._id){
  				this.message = 'success';
  				this.animal._id=response.animal._id;
  				this.animal.user = response.animal.user;
  				//subida de la imagen
  				if (this.filesToUpload){
  					this._uploadService.makeFileRequest(this.url+'/animals/'+this.animal._id+'/upload', [] , this.filesToUpload, this.token, 'image')
                    .then((result:any)=>{
                      this.animal.image = result.animal.image;
                    }
                    )
  				}
  				this._router.navigate(['/admin-panel/listado']);
  				
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
    console.log(this.filesToUpload);
  }

}
