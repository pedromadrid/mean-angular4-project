import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'main-email',
  template: `
  	<div class="panel panel-default">
	    <h2>{{title}}</h2>
	    <show-email></show-email>
	    <save-email></save-email>
    </div>
`
})
export class mainEmailComponent implements OnInit{
  title = 'Modulo email';

ngOnInit(){
	console.log('modulo email cargado')
}
}
