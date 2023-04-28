import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_FORM_FIELD } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from '../data-service.service';


@Component({
  selector: 'app-excel-data',
  templateUrl: './excel-data.component.html',
  styleUrls: ['./excel-data.component.scss']
})
export class ExcelDataComponent implements OnInit {

  excelData!: any[];
  data: any;
  obj: any;
  key: any;



  displayedColumns: string[] = [
    'OrderDate',
    'Region',
    'City',
    'Category',
    'Product',
    'Quantity',
    'UnitPrice',
    'TotalPrice',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private http: DataServiceService) {

  }

  ngOnInit() {
    this.fetchData()
  }


  fetchData() {
    this.http.getData().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res[0]);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log("This is the res : ", res)
      },
      error: console.log
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
