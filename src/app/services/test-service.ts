import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, of } from 'rxjs';
import { TestDto } from '../dtos/TestDto'; // Import Post model
import { Equipmentmodel } from '../dtos/equipmentmodel';
import { environment } from '../../environments';
import { useAuth } from '../authConfig';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  //private apiUrl = 'https://testcertapi-bxcnesashpdvcma2.australiasoutheast-01.azurewebsites.net/api/test'; // API endpoint URL
  //private apiUrl = 'https://localhost:7032/api/tests'; // API endpoint URL
  private apiUrl = environment.apiUrl;
  readonly authConfig = useAuth();
  constructor(private http: HttpClient) {} // Inject HttpClient

  getTests(): Observable<TestDto[]> {
    //return this.http.get<TestDto[]>(`${this.apiUrl}`);
    let header = new HttpHeaders().set('Content-type', 'application/json');
  
    header = header.append('Authorization', 'Bearer ' + this.authConfig.token);
    return this.http.get<TestDto[]>(`${this.apiUrl}tests`, { headers: header });
  }

  // GET request to fetch a single post by ID
  getTestById(id: number): Observable<TestDto> {
    return this.http.get<TestDto>(`${this.apiUrl}/${id}`); // Use template literal for URL
  }

  // GET request to fetch a single post by ID
  getEquipmentsByTestId(id: number): Observable<Equipmentmodel[]> {
    return this.http.get<Equipmentmodel[]>(`${this.apiUrl}/${id}/equipments`); // Use template literal for URL
  }

  // POST request to create a new post
  createTest(post: TestDto): Observable<TestDto> {
    return this.http.post<TestDto>(this.apiUrl, post); // Send post object in request body
  }

  // PUT request to update an existing post
  updateTest(id: number, post: TestDto): Observable<TestDto> {
    return this.http.put<TestDto>(`${this.apiUrl}/${id}`, post); // Send updated post object
  }

  // DELETE request to delete a post by ID
  deleteTest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); // No response body expected for delete (typically)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    alert();
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
