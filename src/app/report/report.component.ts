import { Component, OnInit } from '@angular/core';
import {KanbanServiceService} from '../kanban-service.service';
import {Reportobj} from '../reportobj';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  selectedOption!:string;
  reportdata!:any[] ;

  filter:any[]=[

    {value: 'monthlyreport', viewValue: 'Monthly Report',placeHoldervalue:'Enter month number'},
    {value: 'quaterlyreport', viewValue: 'Quaterly Report',placeHoldervalue:'Enter Q1/Q2/Q3/Q4'},
    {value: 'average', viewValue: 'Average',placeHoldervalue:'Enter location'},







  ];

  filterValue:string="Search";
  exportSuccess!:string;

  
  constructor( private  _service:KanbanServiceService) { }

  ngOnInit(): void {
  }

  displayFilter(value:any){
    this.filterValue=value;
  }


  
  search(filterValue:any,inputValue:any){
    console.log(filterValue.value)
    console.log(inputValue)
    var searchObj=new Reportobj(filterValue.value,inputValue)
    this._service.generateReport(searchObj).subscribe(
      response=>{console.log("response received for report"+response),this.reportdata=response},
      error=>{console.log("error occurred in report"+error)}
    );
    
    
  }
 
  exportCsv(){

    this._service.exportReportData(this.reportdata).subscribe(
      response=>{console.log("export csv response received");this.exportSuccess="Your Csv File is Successfully Exported to your Machine!!!"},
      error=>{console.log("error csv error happend",error.error)}

    );

  }











}
