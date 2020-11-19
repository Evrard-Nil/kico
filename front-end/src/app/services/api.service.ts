import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {   }

  doGet<T>(endpoint: string, options?: object) {
    return this.http.get<T>(endpoint, options)
    .pipe(
      catchError(this.handleError)
    )
  }

  doPost(endpoint: string, body: any, options?: object) {
    return this.http.post(endpoint, body, options)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error)
    return throwError(
      'Erreur lors de l\'appel à l\'API');
    
  }
}
