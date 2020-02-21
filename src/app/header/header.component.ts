import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
//Step 1
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent  implements OnInit{
  //Step 2 make object
  constructor(private dataStorageService: DataStorageService ,private auth:AuthService) {}


  //Step 3
  ngOnInit(){
    console.log('Its called')
    this.auth.user.subscribe(data=>{
     
      console.log(data)
    })
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
