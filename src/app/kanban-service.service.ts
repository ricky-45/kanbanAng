import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { AuthGuard } from './shared/auth.guard';
import { Status } from './status';
import { Candidate } from './candidate';
import { CustomTag } from './custom-tag';
import { Comment } from './comment';
import { tap } from 'rxjs';
import { Reportobj } from './reportobj';




@Injectable({
  providedIn: 'root'
})
export class KanbanServiceService {
 
  status = "";

  searchObject: any;

  deleteUrl="http://localhost:8090/delete";

  private _refresh = new Subject<void>();
  get Refresh() {
    return this._refresh;
  }
  
  deleteCandidate(candidateId:any) {
    let deleteTask=`${this.deleteUrl}/${candidateId}`;
    console.log("delete taskkk",deleteTask);
    return this._http.delete(deleteTask,{responseType: 'text'});
  }



  object: any;
  constructor(private _http: HttpClient) { }

  public logInUserFromRemote(user: User): Observable<any> {
    console.log("login service front end hit")
    return this._http.post<any>('http://localhost:8090/login', user)
  }


//   public deleteCandidate(candidateid:string): Observable<void>
 
//   {
// // const delcan = "http://localhost:8090/delete/" + candidateid;
// // return this._http.delete(delcan);
//      return this._http.delete<any>("http://localhost:8090/delete/" + candidateid)
//     // .pipe(
//     //   tap(() => {
//     //     this._refresh.next();
//     //   })
//     // );
//   }

  public registerUserFromRemote(user: User): Observable<any> {
    return this._http.post<any>("http://localhost:8090/register", user)
  }

  saveCandidateImage(formData: FormData): Observable<any> {
    return this._http.post("http://localhost:8090/saveCandidateProfile", formData);

  }

  public getDataFromBackend(data: any): Observable<any> {
    return this._http.post<any>("http://localhost:8090/getData", data);
  }

  public updateStatus(status: Status) {
    return this._http.put<any>("http://localhost:8090/updateData", status);
  }

  public updateCustomTags(obj: CustomTag) {
    console.log("uodate custom service hit")
    console.log(obj.value)
    console.log(obj)
    return this._http.put<any>("http://localhost:8090/updateCustomTags", obj)

  }

  exportCsvData(searchObj: any) {

    console.log("The service hit for export csv")

    searchObj = this.searchObject;

    console.log(searchObj);

    return this._http.put<any>("http://localhost:8090/exportCsv", searchObj);

  }

  exportReportData(reportdata: any[]) {

    return this._http.put<any>("http://localhost:8090/reportDataCsv", reportdata);
  }




  public getAllComments(commentObj: Comment): Observable<any> {
    return this._http.post<any>("http://localhost:8090/getComments", commentObj)
  }


  public showAllComments(commentId: String): Observable<any> {
    commentId = this.object.candidateId;
    console.log("This below is the comment id that i am receiving")
    console.log(commentId)
    return this._http.post<any>("http://localhost:8090/getAllComment", commentId);
  }


  public storeObj(searchObj: any) {

    this.searchObject = searchObj;

  }


  public searchData(searchObj: any) {

    searchObj = this.searchObject;

    console.log(searchObj)

    console.log("search data service hit")

    return this._http.post<any>("http://localhost:8090/searchData", searchObj)

  }

  public sendObject(obj: any) {
    this.object = obj;
    console.log(obj.candidateId)


  }


  public giveDatatoModal(obj: any): Observable<any> {
    obj = this.object;
    console.log("giveDataTOModal activated")
    console.log(obj)
    return this._http.post<any>("http://localhost:8090/getObj", obj)
  }

  uploadingImage(imageFormData: any): Observable<any> {
    return this._http.post<any>("http://localhost:8090/upload/image/", imageFormData);
  }


  viewingImage(image: any) {
    return this._http.get<any>("http://localhost:8090/get/image/info/" + image);
  }

  public statusReceived(status: string) {
    if (status === "ok") {
      this.status = "ok";
      return "ok";
    }
    else {
      console.log("notok hit")
      this.status == "notok"
      return "notok";
    }

  }

  public registerCandidateFromRemote(candidate: Candidate): Observable<any> {

    return this._http.post<any>("http://localhost:8090/registerCandidate", candidate)
      .pipe(
        tap(() => {
          this._refresh.next();
        })
      );

  }


  public generateReport(obj: Reportobj): Observable<any> {
    return this._http.post<any>("http://localhost:8090/generateReport", obj)
  }



  public statusSend(value: String) {
    if (this.status == "ok") {
      value = "ok"
      return value;
    }
    else {
      value = "notok"
      return value;
    }
  }
}
function delcan(delcan: any) {
  throw new Error('Function not implemented.');
}

function candel(candel: any) {
  throw new Error('Function not implemented.');
}

function Refresh1() {
  throw new Error('Function not implemented.');
}

