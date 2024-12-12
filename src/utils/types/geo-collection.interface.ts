import { IGeoJSON } from "./geo-json.interface";
import { TGeometry } from "./geo.types";

export interface IGeometryCollection extends IGeoJSON {
  type: "GeometryCollection";
  geometries: TGeometry[];
}
