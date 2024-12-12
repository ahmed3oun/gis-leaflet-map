import { Injectable } from '@angular/core';
import data from "../../assets/gz_2010_us_500_11_20m.json";

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor() { }

  async getStateShapes() {
    return data;
  }
}
