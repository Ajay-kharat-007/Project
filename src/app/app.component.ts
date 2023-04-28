import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  mainData:any =  [];
  excelData!: any[];

  constructor(private http: DataServiceService) {
  }

  convertData(arr: any) {
    let obj = {
      "OrderDate": arr[0],
      "Region": arr[1],
      "City": arr[2],
      "Category": arr[3],
      "Product": arr[4],
      "Quantity": arr[5],
      "UnitPrice": arr[6],
      "TotalPrice": arr[7]
    }
    this.mainData.push(obj)
  }

  changeData(){
    console.log(this.excelData)
    this.excelData.map((elem) => {
      this.convertData(elem)
    })
    console.log(this.mainData)
    this.http.postData(this.mainData).subscribe((res)=>{
      console.log(res)
    })
  }


  onSubmit() {
    console.log(this.excelData)
    this.excelData.map((elem) => {
      this.convertData(elem)
    })
    console.log(this.mainData)
    this.http.postData(this.mainData).subscribe((res)=>{
      console.log(res)
    })
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length > 1) {
      alert('Multiple files are not allowed');
      return;
    }
    else {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[1];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        // Print the Excel Data
        this.excelData = data;
        console.log(data);
      }
      reader.readAsBinaryString(target.files[0]);
    }
  }
}
