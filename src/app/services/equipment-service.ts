import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, of } from 'rxjs';
import { Equipmentmodel } from '../dtos/equipmentmodel';
@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl = 'https://localhost:7032/api/equipments';
  constructor(private http: HttpClient) {} // Inject HttpClient

  getEquipments(): Observable<Equipmentmodel[]> {
    return this.http.get<Equipmentmodel[]>(`${this.apiUrl}`);
  }
  // GET request to fetch a single post by ID
  getEquipmentById(id: number): Observable<Equipmentmodel> {
    return this.http.get<Equipmentmodel>(`${this.apiUrl}/${id}`); // Use template literal for URL
  }
  getEquipmentByTestId(Testid: number): Observable<Equipmentmodel[]> {
    return this.http.get<Equipmentmodel[]>(`${this.apiUrl}/${Testid}`);
  }
}
