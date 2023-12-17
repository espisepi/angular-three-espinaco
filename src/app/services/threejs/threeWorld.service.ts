import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThreeWorldService {
  constructor() {}

  initWorld() {
    console.log('InitWorld!');
  }
}
