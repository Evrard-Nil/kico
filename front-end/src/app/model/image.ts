export class Image {
  id: number
  secteur_id: number
  name: String
  time: string
  video_id: number
  url: String
  annotations: Array<Array<([number, number])>>;

  constructor() {}
}
