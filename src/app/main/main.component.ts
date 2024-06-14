import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
curp = '';

constructor(private api:ApiService){
  this.api.getData().subscribe(response => {
    console.log(response);
  },err => {
    console.log(err);
  });

}

}
