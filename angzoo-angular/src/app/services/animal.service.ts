import { Injectable } from '@angular/core';
import { Http, Response, Headers } from   '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class AnimalService{
	public url:string;


	constructor(private _http: Http){
		this.url= GLOBAL.url;
	}

	addAnimal(token, animal){
		let params = JSON.stringify(animal);
		let headers = new Headers({
			'Content-Type':'application/json',
			'token':token
		})

		return this._http.post(this.url+'/animals', params, {headers:headers})
			.map(res=> res.json());

	}

	getAnimals(){
		return this._http.get(this.url+'/animals').map(res=> res.json());
	}

	getAnimal(animalId){
		return this._http.get(this.url+'/animals/'+animalId).map(res=> res.json());
	}

	editAnimal(token,  animal){
		let params = JSON.stringify(animal);
		let headers = new Headers({
			'Content-Type':'application/json',
			'token':token
		})

		return this._http.put(this.url+'/animals/'+animal._id, params, {headers: headers})
						.map(res => res.json());
	}

	deleteAnimal(token,  id){
		let headers = new Headers({
			'Content-Type':'application/json',
			'token':token
		})

		return this._http.delete(this.url+'/animals/'+id, {headers: headers})
						.map(res => res.json());
	}

}