import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'], 
  providers: [UserService, UploadService]
})


export class UserInfoComponent implements OnInit {

	public title: string;
  	public user: User;
  	public identity;
  	public token;
  	public message;
    public url;


  constructor(
	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService,
    private _uploadService: UploadService
  	){
  		this.title = 'Mis Datos';
  		this.user = this._userService.getIdentity();
  		this.identity = this._userService.getIdentity();
  		this.token = this._userService.getToken();
  		this.url = GLOBAL.url;
  	}


  ngOnInit() {
  }

  onSubmit(){
  	this._userService.update(this.user).subscribe(
  		response =>{
  			if (response.user){
  				this.message = 'success';
  				localStorage.setItem('identity',JSON.stringify(this.user));

          //subida de la imagen

          this._uploadService.makeFileRequest(this.url+'/users/'+this.user._id+'/upload', [] , this.filesToUpload, this.token, 'image')
                    .then((result:any)=>{
                      this.user.image = result.user.image;
                      localStorage.setItem('identity', JSON.stringify(this.user));  
                      console.log(this.user);
                    }
                    )

  			} else{
  				this.message = 'error';
  			}
  			
  			
  		},
  		error => {
  			var errorMsg = <any>error;

			if (errorMsg){
				this.message = 'error';
				console.log('mensaje de error '+ JSON.parse(errorMsg._body).message);
				console.log('status de error '+ errorMsg.status);
				//alert(JSON.parse(errorMsg._body).message);
				}
			console.log(<any>error)
  		})
  }

  public filesToUpload: Array<File>;

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //console.log(this.filesToUpload);
  }

}
