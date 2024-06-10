import { Observable } from "rxjs";

export interface CdnProvider {
  upload(image: any): Observable<IUploadResponse>,
  download(image: any): any
}


export interface IUploadResponse {
  result: {
    id: string,
    filename: string,
    uploaded: string,
    requireSignedURLs: boolean,
    variants: any[]
  },
  success: boolean,
  errors: any[],
  messages: any[]
}
