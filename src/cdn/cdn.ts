import { Injectable } from '@nestjs/common';
import { CdnProvider } from './cdn.interface';
import { CloudFlareCdn } from './cdn-cloudflare.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';


@Injectable()
export class Cdn implements CdnProvider {

  constructor(private cdnProvider: CloudFlareCdn) { }

  upload(image: any) {
    return this.cdnProvider.upload(image);
  }

  getImage(imageId: any) {
    return this.cdnProvider.getImage(imageId);
  }

  download(image: any): any {
    return this.cdnProvider.download(image);
  }
}
