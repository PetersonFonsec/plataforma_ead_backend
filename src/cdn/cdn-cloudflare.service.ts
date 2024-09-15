import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import fs from 'fs';
import { Observable, map, tap } from "rxjs";

import { CdnProvider, IUploadResponse } from "./cdn.interface";
import { CloudFlareStreamUpload } from "./cloudflare.interface";
@Injectable()
export class CloudFlareCdn implements CdnProvider {
  #account_id = process.env.CDN_ACCOUNT_ID;
  #api_base = process.env.CDN_BASE_URL;
  #token = process.env.CDN_API_TOKEN;
  #hash = process.env.CDN_HASH;
  readonly #streamTypes = ["video/mp4"];
  readonly #imageTypes = [''];
  readonly #byteValue = 1048576;

  get url(): string {
    const endpoint = this.#api_base + '/client/v4/accounts/<ACCOUNT_ID>';
    return endpoint.replace('<ACCOUNT_ID>', this.#account_id);
  }

  constructor(private readonly httpService: HttpService) {
    if (!this.#token) throw new Error('Sem TOKEN do cloud flare');
    if (!this.#account_id) throw new Error('Sem CDN_ACCOUNT_ID do cloud flare');
  }

  upload(blobData: any): Observable<IUploadResponse> {
    if (this.#streamTypes.includes(blobData.mimetype)) {
      return this.uploadStream(blobData)
    };

    return this.uploadImage(blobData)
  }

  uploadStream(stream: any, creatorId?: string): Observable<IUploadResponse> {
    const streamblob = fs.readFileSync(stream.path);
    const formData = new FormData();
    const blobData = new Blob([streamblob]);

    if (blobData.size > (200 * this.#byteValue)) {
      throw new BadRequestException("Tamanho maximo do arquivo de video é de 200 megas.");
    }

    formData.append("file", blobData, stream.filename);
    // formData.append("creator", creatorId);

    return this.httpService.post<CloudFlareStreamUpload>(`${this.url}/stream`, formData, {
      headers: {
        Authorization: `Bearer ${this.#token}`
      }
    }).pipe(
      map(res => res.data),
      map(res => this.convertStreamReturnInUploadedResponse(res))
    )
  }

  private convertStreamReturnInUploadedResponse(res: CloudFlareStreamUpload): IUploadResponse {
    return {
      result: {
        id: res.result.uid,
        filename: res.result.meta.name,
        uploaded: res.result.uploaded,
        requireSignedURLs: res.result.requireSignedURLs,
        variants: []
      },
      success: res.success,
      errors: res.errors,
      messages: res.messages
    }
  }

  uploadImage(image: any): Observable<IUploadResponse> {
    const imageblob = fs.readFileSync(image.path);
    const formData = new FormData();
    const blobData = new Blob([imageblob]);
    formData.append("file", blobData, image.filename);

    return this.httpService.post<IUploadResponse>(`${this.url}/images/v1`, formData, {
      headers: {
        Authorization: `Bearer ${this.#token}`
      }
    }).pipe(map(res => res.data))
  }

  getImage(imageId: string): Observable<string> {
    return new Observable((subscribe) => {
      subscribe.next(`https://imagedelivery.net/${this.#hash}/${imageId}/public`)
      subscribe.complete();
    });
  }

  download(image: any): any {
    return
  }

  SubscribeStreamNotifications() {
    return this.httpService.put<CloudFlareStreamUpload>(`${this.url}/stream/webhook`, {
      notificationUrl: ""
    }, {
      headers: {
        Authorization: `Bearer ${this.#token}`
      }
    })
  }
}
