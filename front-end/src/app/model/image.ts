export class Image {
  id: String
  secteur_id: String
  name: String
  time: String
  video_id: String
  url: String
  annotations: Array<Array<([number, number])>>;

  constructor() {}
}
