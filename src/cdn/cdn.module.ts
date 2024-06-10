import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { CloudFlareCdn } from './cdn-cloudflare.service';
import { Cdn } from './cdn';

@Module({
  imports: [HttpModule],
  providers: [Cdn, CloudFlareCdn],
  exports: [Cdn, CloudFlareCdn],
})
export class CdnModule { }
