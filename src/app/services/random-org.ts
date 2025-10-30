import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Method } from 'ionicons/dist/types/stencil-public-runtime';

@Injectable({
  providedIn: 'root'
})
export class RandomOrg {
  private url = 'https://api.random.org/json-rpc/2/invoke';
  private key = '63d56ba4-cb01-44ba-9547-83109ba5e864'
  
  constructor(private http: HttpClient){}
  getHod(maxHodnota: number){
    const dotaz = {
      jsonrpc: '2.0',
      method: 'generateIntegers',
      params:{
        apiKey: this.key,
        n:1,
        min:1,
        max: maxHodnota,
        replacement: true
      }, id: 42 //odpověĎ na všechno :-)
    };
    return this.http.post(this.url, dotaz);
  }
}
