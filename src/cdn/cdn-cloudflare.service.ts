import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import fs from 'fs';

import { CdnProvider, IUploadResponse } from "./cdn.interface";
import { Observable, map } from "rxjs";
import { AxiosResponse } from "axios";

@Injectable()
export class CloudFlareCdn implements CdnProvider {
  #account_id = process.env.CDN_ACCOUNT_ID;
  #api_base = process.env.CDN_BASE_URL;
  #token = process.env.CDN_API_TOKEN;
  #hash = process.env.CDN_HASH;

  get url(): string {
    const endpoint = this.#api_base + '/client/v4/accounts/<ACCOUNT_ID>/images/v1';
    return endpoint.replace('<ACCOUNT_ID>', this.#account_id);
  }

  constructor(private readonly httpService: HttpService) {
    if (!this.#token) throw new Error('Sem TOKEN do cloud flare');
    if (!this.#account_id) throw new Error('Sem CDN_ACCOUNT_ID do cloud flare');
  }

  upload(image: any): Observable<IUploadResponse> {
    const imageblob = fs.readFileSync(image.path);
    const formData = new FormData();
    const blobData = new Blob([imageblob]);
    formData.append("file", blobData, image.filename);

    return this.httpService.post<IUploadResponse>(this.url, formData, {
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
}
