import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';
import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html',
  styleUrls: ['./keepers.component.css'],
  animations: [fadeIn],
  providers: [UserService]
})
export class KeepersComponent implements OnInit {

	public title:string;
  	public keepers: User[];
  	public url:string;

  constructor(
  	private _userService: UserService
  	) {
  	this.title = 'Cuidadores'; 
  	this.url = GLOBAL.url;
  }

  ngOnInit() {
  	console.log('keepers.component cargado!');
  	this.getKeepers();
  }

  getKeepers(){
  	this._userService.getKeepers().subscribe(
  		response =>{
  			console.log(response)
  			if (!response.users){

  			}else{
  				this.keepers = response.users;
  				
  			}
  		},
  		error =>{
  			console.log(<any>error);
  		})
  }

}
