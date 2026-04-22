import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, of } from 'rxjs';
import { Testmodel } from '../models/testmodel'; // Import Post model

@Injectable({
  providedIn: 'root', 
})
export class TestService {
  private apiUrl = 'https://localhost:7032/api/test'; // API endpoint URL

  constructor(private http: HttpClient) {} // Inject HttpClient

getTests(): Observable<Testmodel[]> {
    return this.http.get<Testmodel[]>(`${this.apiUrl}`);
  }


  // GET request to fetch a single post by ID
  getTestById(id: number): Observable<Testmodel> {
    return this.http.get<Testmodel>(`${this.apiUrl}/${id}`); // Use template literal for URL
  }

  // POST request to create a new post
  createTest(post: Testmodel): Observable<Testmodel> {
    return this.http.post<Testmodel>(this.apiUrl, post); // Send post object in request body
  }

  // PUT request to update an existing post
  updateTest(id: number, post: Testmodel): Observable<Testmodel> {
    return this.http.put<Testmodel>(`${this.apiUrl}/${id}`, post); // Send updated post object
  }

  // DELETE request to delete a post by ID
  deleteTest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); // No response body expected for delete (typically)
  }

  private handleError<T> (operation = 'operation', result?: T) {
           alert()
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
