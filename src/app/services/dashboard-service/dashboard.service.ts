import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ICourse } from 'src/app/Interfaces/course-interface';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  //Get method to retreive the courses from the Json File 
  getAllCourses(): Observable<ICourse[]> {
    let tempVar = this.http.get<ICourse[]>('http://localhost:3000/courses').pipe(catchError(this.errorHandler));
    return tempVar;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || "Server Error");
  }

}
