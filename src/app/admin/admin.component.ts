import { Component } from '@angular/core';
import { userData } from '../model/content';
import { GetDataService } from '../services/get-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {


  userData : userData[] = []
  constructor(private getData : GetDataService){}

  ngOnInit(){
    this.getData.getAll().subscribe({
      next: data =>{
       // console.log(data)
       this.userData = data;
      }
    })
  }
}
