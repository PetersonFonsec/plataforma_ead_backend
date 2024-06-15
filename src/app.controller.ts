import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Cdn } from './cdn/cdn';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './shared/utils/storage';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cdnService: Cdn,
  ) { }

  @Get("/")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/CDN")
  @UseInterceptors(FileInterceptor('image', storage('products_photo')))
  async uploadImage(@UploadedFile() image): Promise<any> {
    this.cdnService.upload(image).subscribe((res) => {
      console.log(res)
    });
  }
}
