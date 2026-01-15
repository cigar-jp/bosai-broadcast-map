export interface SpeakerProperties {
  id: number;
  name: string;
  address: string;
  type: string;
}

export interface SpeakerFeature {
  type: "Feature";
  properties: SpeakerProperties;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface SpeakersGeoJSON {
  type: "FeatureCollection";
  features: SpeakerFeature[];
}
