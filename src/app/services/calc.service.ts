import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  sum(a: number, b: number): number {
    return a + b;
  }
}
