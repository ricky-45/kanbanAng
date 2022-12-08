import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { User } from '../user';
import { KanbanServiceService } from '../kanban-service.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MatChipEvent, MatChipInputEvent } from '@angular/material/chips';
import { CandidateModelComponent } from '../candidate-model/candidate-model.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Status } from '../status';
import { MatRipple } from '@angular/material/core';
import { DOCUMENT } from '@angular/common';

import { Inject } from '@angular/core';

// import {ClickOutsideModule} from 'ng-click-outside';

import { CustomTag } from '../custom-tag';

import { MatSelectModule } from '@angular/material/select';

import { SearchModalComponent } from '../search-modal/search-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Search } from '../search';

import { Candidate } from '../candidate';
import { ReportComponent } from '../report/report.component';
import { RegisterComponent } from '../register/register.component';
import { ThisReceiver } from '@angular/compiler';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css'],
})
export class LoginSuccessComponent implements OnInit {
  fil: any[] = [
    { value: 'gcm', viewValue: 'GCM' },

    { value: 'position', viewValue: 'Position' },

    { value: 'project', viewValue: 'Project' },

    { value: 'duedate', viewValue: 'DueDate' },

    { value: 'candidatename', viewValue: 'CandidateName' },

    { value: 'candidateid', viewValue: 'CandidateId' },
  ];


  searchData: Candidate[] = [];

  filterValue!: string;
  gcmlevel!: String;
  position!: String;
  project!: String;
  duedate!: String;
  searchText:any;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  searchValue: any[] = [];

  isValid: boolean = true;

  globalIndex!: number;

  // ModalVariables------

  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ModalComponent, any> | undefined;
  candidateModalDialog: MatDialogRef<CandidateModelComponent, any> | undefined;
  searchModalDialog: MatDialogRef<SearchModalComponent, any> | undefined;
  reportModalDialog: MatDialogRef<ReportComponent, any> | undefined;
  // -----------------

  objData: any;
  deleteUrl: any;

  // @Output() refreshList = new EventEmitter();
  constructor(
    private http: HttpClient,
    private _service: KanbanServiceService,
    public matDialog: MatDialog,
    @Inject(DOCUMENT) document: Document
  ) {}

  data: any[] = [];
  backlog: any[] = [];
  inProgress: any[] = [];
  inReview: any[] = [];
  done: any[] = [];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log(event.currentIndex);
      console.log(event.container.element.nativeElement.id);
      var dumpContainer: String = event.container.element.nativeElement.id;
      if (dumpContainer === 'cdk-drop-list-0') {
        console.log('this is container 1');
        var id: string = this.backlog[event.currentIndex].candidateId;
        console.log(id);
        var container = new Status(0, id);
        this._service.updateStatus(container).subscribe(
          (response) => {
            console.log('response received for data update');
          },
          (error) => {
            console.log('error occurred in data updatation' + error);
          }
        );
      } else if (dumpContainer === 'cdk-drop-list-1') {
        console.log('this is container 2');
        var id: string = this.inProgress[event.currentIndex].candidateId;
        console.log(id);
        var container = new Status(1, id);
        this._service.updateStatus(container).subscribe(
          (response) => {
            console.log('response received for data update');
          },
          (error) => {
            console.log('error occurred in data updatation' + error);
          }
        );
      } else if (dumpContainer === 'cdk-drop-list-2') {
        console.log('this is container 3');
        console.log(event.container);
        var id: string = this.inReview[event.currentIndex].candidateId;
        console.log(id);
        var container = new Status(2, id);
        this._service.updateStatus(container).subscribe(
          (response) => {
            console.log('response received for data update');
          },
          (error) => {
            console.log('error occurred in data updatation' + error);
          }
        );
      } else if (dumpContainer === 'cdk-drop-list-3') {
        var id: string = this.done[event.currentIndex].candidateId;
        console.log(id);
        var container = new Status(3, id);
        this._service.updateStatus(container).subscribe(
          (response) => {
            console.log('response received for data update');
          },
          (error) => {
            console.log('error occurred in data updatation' + error);
          }
        );
      }
    }
  }

  // openModal() {
  //   this.modalRef = this.modalService.open(ModalComponent, {
  //     modalClass: 'modal-dialog-centered'
  //   })
  // }

  // ngOnChanges(changes:RegisterComponent): void {

  //   console.log(this.registerCandidate());
  // }

  display(event: any) {
    console.log('The div is hit');
    // console.log(event.currentIndex)
    // console.log(event.data)
    // console.log(event)
    console.log(event);
    this.dialogConfig.id = 'modalId';
    this.dialogConfig.height = '450px';
    this.dialogConfig.width = '690px';
    this._service.sendObject(event);

    this.modalDialog = this.matDialog.open(ModalComponent, this.dialogConfig);
  }

  registerCandidate() {
    this.dialogConfig.id = 'modalButton';

    this.dialogConfig.height = '600px';

    this.dialogConfig.width = '750px';

    this.candidateModalDialog = this.matDialog.open(
      CandidateModelComponent,
      this.dialogConfig
    );
  }

  add(event: MatChipInputEvent): void {
    console.log('This is mat chip event');
    console.log(event);
    console.log(event.chipInput.id);
    const value = (event.value || '').trim();
    console.log(value);
    if (value) {
      console.log('this is mat chip value');

      console.log(value);

      this.searchValue.push({ name: value });
    }

    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.searchValue.indexOf(fruit);
    if (index >= 0) {
      this.searchValue.splice(index, 1);
    }
  }

  // ngOnChanges(SimpleChanges:Candidate){
  //   this.deleteCandidate(candel);
  // }

 

  //   this._service.Refresh.subscribe(response=>{
  //     this.getAll();});

  // }

  ngOnInit(): void {
    this.getAll();

    this._service.Refresh.subscribe((response) => {
      this.getAll();
    });
  }

  candidateId(candidateId: any) {
    throw new Error('Method not implemented.');
  }

  getAll() {
    console.log('Get Data Hit');
    this.data = [];
    this._service.getDataFromBackend(this.data).subscribe(
      (response) => {
        console.log('response received');
        this.data = response;
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].status === 0) {
            this.backlog.push(this.data[i]);
          } else if (this.data[i].status === 1) {
            this.inProgress.push(this.data[i]);
          } else if (this.data[i].status === 2) {
            this.inReview.push(this.data[i]);
          } else if (this.data[i].status === 3) {
            this.done.push(this.data[i]);
          }
        }
      },
      (error) => {
        console.log('exception occurred');
      }
    );
  }

  // deleteCandidate(candidateId: any) {
  //   this._service.deleteCandidate(candidateId).subscribe(
  //     (data) =>{
        
  //       this.getAll();
  //       console.log("All data is coming hereee");
        
  //     },
  //     (error:HttpErrorResponse) =>{
  //       console.log(error);
        
  //     }
     
  //     );
  //   }
  deleteCandidate(candidateId:any){

  this.backlog.splice(candidateId);
  this._service.deleteCandidate(candidateId).subscribe(
    (data)=>{this.getAll()}
    , err=> {
    console.log(err.message)

  });
  console.log("Service hit");
}

  displayGCM(value: String, id: String) {
    console.log(value);
    value = value.trim();
    var columnName: String = 'gcm';
    var obj = new CustomTag(value, columnName, id);
    console.log(obj);
    this._service.updateCustomTags(obj).subscribe(
      (response) => {
        console.log('response received');
      },

      (error) => {
        console.log('error occured');
      }
    );
  }

  displayPosition(value: String, id: String) {
    value = value.trim();
    var columnName: String = 'position';
    var obj = new CustomTag(value, columnName, id);
    this._service.updateCustomTags(obj).subscribe(
      (response) => {
        console.log('response received');
      },
      (error) => {
        console.log('error occured');
      }
    );
  }

  displayDueDate(value: String, id: String) {
    value = value.trim();

    var columnName: String = 'duedate';

    var obj = new CustomTag(value, columnName, id);

    this._service.updateCustomTags(obj).subscribe(
      (response) => {
        console.log('response received');
      },

      (error) => {
        console.log('error occured');
      }
    );
  }

  displayProject(value: String, id: String) {
    value = value.trim();

    var columnName: String = 'project';

    var obj = new CustomTag(value, columnName, id);

    this._service.updateCustomTags(obj).subscribe(
      (response) => {
        console.log('response received');
      },

      (error) => {
        console.log('error occured');
      }
    );
  }

  displayFilter(value: any) {
    this.filterValue = value;
  }

  search(filterVal: any, inputVal: any) {
    console.log(filterVal.value);
    console.log(inputVal);

    this.dialogConfig.id = 'modalButton';

    this.dialogConfig.height = '600px';

    this.dialogConfig.width = '750px';

    var searchObj = new Search(filterVal.value, inputVal);

    this._service.storeObj(searchObj);

    this.searchModalDialog = this.matDialog.open(
      SearchModalComponent,
      this.dialogConfig
    );
  }

  openReport() {
    this.dialogConfig.id = 'modalButton';
    this.dialogConfig.height = '300px';
    this.dialogConfig.width = '500px';

    this.reportModalDialog = this.matDialog.open(
      ReportComponent,
      this.dialogConfig
    );
  }

 
  }

