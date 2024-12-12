import { IGeoJSON } from "./geo-json.interface";


export interface IPolygon extends IGeoJSON {
  type: "Polygon";
  coordinates: [number, number][][];
}

export interface IMultiPolygon extends IGeoJSON {
  type: "MultiPolygon";
  coordinates: [number, number][][][];
}
