import { IFeature, IFeatureCollection } from "./feature.interface";
import { IGeometryCollection } from "./geo-collection.interface";
import { ILineString, IMultiLineString } from "./line-string.interface";
import { IMultiPoint, IPoint } from "./point.interface";
import { IMultiPolygon, IPolygon } from "./polygon.interface";

// Geometry Types Union
export type Geometry =
  | IPoint
  | IMultiPoint
  | ILineString
  | IMultiLineString
  | IPolygon
  | IMultiPolygon
  | IGeometryCollection;

// GeoJSON Root Type
export type GeoJSONType = Geometry | IFeature | IFeatureCollection;
