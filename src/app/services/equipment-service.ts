import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private apiUrl = 'https://localhost:7032/api/test'; // API endpoint URL
  constructor(private http: HttpClient) {} // Inject HttpClient
  
}
