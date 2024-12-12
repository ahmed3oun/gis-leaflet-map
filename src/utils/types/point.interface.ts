import { IGeoJSON } from "./geo-json.interface";

export interface IPoint extends IGeoJSON {
  type: "Point";
  coordinates: [number, number]; // [x (long), y (lat)]
}

export interface IMultiPoint extends IGeoJSON {
  type: "MultiPoint";
  coordinates: [number, number][];
}
