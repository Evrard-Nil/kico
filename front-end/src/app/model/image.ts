import { Nodule } from "./nodule"

export class Image {
  id: String
  secteur_id: String
  name: String
  time: String
  video_id: String
  url: String
  annotations: Array<Array<([number, number])>>;
  nodule: Nodule

  constructor() {}
}
