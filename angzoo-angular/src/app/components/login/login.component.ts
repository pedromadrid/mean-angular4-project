import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public identity;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService: UserService
  ) {
  	this.title = 'Login';
  	this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit() {
  	console.log(this._userService.getIdentity());
  }

  onSubmit(loginForm){
 	  	this._userService.login(this.user).subscribe(
		response =>{
			this.identity=response;
			if (this.identity.user){
				this.status = 'success';
				this.identity.user.password='';
				localStorage.setItem('identity', JSON.stringify(this.identity.user));
				localStorage.setItem('token', this.identity.token);
				this._router.navigate(['/']);
			} else{
				if (response.status='400'){
				this.status = 'error';
				console.log('mensaje de error '+response._body);
				}
			}
		},
		error => {
			var errorMsg = <any>error;

			if (errorMsg){
				this.status = 'error';
				console.log('mensaje de error '+ JSON.parse(errorMsg._body).message);
				console.log('status de error '+ errorMsg.status);
				//alert(JSON.parse(errorMsg._body).message);
				}
			console.log(<any>error)
	})
  }

}
