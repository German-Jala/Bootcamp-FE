import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CardInfoService {
  private apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
  private httpService = inject(HttpClient);

  getBanListCards() {
    const url = this.apiUrl + '?level=4&attribute=water&sort=atk';
    return this.httpService.get<ApiResponse>(url);
  }

  getCardByName(name: string = 'Dark Magician') {
    const url = this.apiUrl + '?name=' + name;
    return this.httpService.get<ApiResponse>(url);
  }
}
