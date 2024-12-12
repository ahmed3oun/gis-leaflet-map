import { IGeoJSON } from "./geo-json.interface";
import { Geometry } from "./geo.types";


export interface IFeature<G extends Geometry = Geometry, P = any> extends IGeoJSON {
  id?: string | number;
  type: "Feature";
  geometry: G | null;
  properties: P;
}

export interface IFeatureCollection<G extends Geometry = Geometry, P = any> extends IGeoJSON {
  type: "FeatureCollection";
  features: IFeature<G, P>[];
}
