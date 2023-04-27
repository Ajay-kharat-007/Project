import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private service : HttpClient) {
  }
  
  getData(){
    return this.service.get('http://localhost:3000/excelData')
   }

   postData(data:any){
    return this.service.post('http://localhost:3000/excelData', data)
   }
}
