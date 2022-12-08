import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { KanbanServiceService } from '../kanban-service.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Candidate } from '../candidate';
import { Comment } from '../comment';





@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  public userFile: any = File;
  formdata: any = FormGroup;
  constructor(private _service: KanbanServiceService,
    public dialogRef: MatDialogRef<ModalComponent>,
    private _http: HttpClient) { }

  candidateObj: any;
  commentObj: any;

  commentList: Comment[] = [];
  // Upload Image Parameter-------------




  // --------------------------------------




  ngOnInit(): void {
    console.log("nginIt activated")
    this._service.giveDatatoModal(this.candidateObj).subscribe(
      response => { console.log(response); this.candidateObj = response },
      error => { ("error occurred") }
    );
    console.log("This is from modal component")
  }

  closeModal() {
    this.dialogRef.close();
  }



  getComment(value: String) {
    var commentObj = new Comment(this.candidateObj.candidateId, value);
    this._service.getAllComments(commentObj).subscribe(
      response => { console.log("response recieved for comment section"); this.commentList = response },
      error => { console.log("error occurred in comment section response") }
    );
    this._service.showAllComments(this.commentObj).subscribe(
      response => { console.log("i am all comment"); console.log("getting all the comments ok"); this.commentList = response },
      error => { console.log("getting all the comments are not ok") }

    );
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.userFile = file;
  }

  submitImage(formdata: FormGroup) {
    const user = formdata.value;
    var formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('file', this.userFile);
    formData.append('candidateId', this.candidateObj.candidateId);
    this._service.saveCandidateImage(formData).subscribe(
      response => { console.log("response received for image upload") },
      error => { console.log("error while uploading the image") }

    );

    console.log(formData)

  }


}
