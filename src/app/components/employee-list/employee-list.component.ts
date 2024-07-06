import { Component, inject, OnInit } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatTable, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: IEmployee[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'title', 'address', 'image'];

  constructor(private httpService: HttpService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.httpService.getAllEmployee().subscribe(result => {
      this.employeeList = result;
      console.log(this.employeeList);
      console.log("Hello");
    });
  }

  getElementImageUrl(base64Image: string): string {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${base64Image}`) as string;
  }
  
}
