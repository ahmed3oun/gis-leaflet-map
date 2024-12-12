import { IGeoJSON } from "./geo-json.interface";

export interface ILineString extends IGeoJSON {
  type: "LineString";
  coordinates: [number, number][];
}

export interface IMultiLineString extends IGeoJSON {
  type: "MultiLineString";
  coordinates: [number, number][][];
}
