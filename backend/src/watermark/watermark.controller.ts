import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { WatermarkService } from './watermark.service';
import * as path from 'path';

@Controller('watermark')
export class WatermarkController {
   constructor(private readonly watermarkService: WatermarkService) {}

   @Post('')
   @UseInterceptors(FilesInterceptor('files'))
   async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
      //Path for our watermark
      const watermarkPath = path.join(__dirname, '..', 'assets', 'watermark', 'default-wm.png');

      //Processing files
      const processedFiles = await this.watermarkService.prepareImage(files, watermarkPath);
      console.log(processedFiles);
      //return processed files
      return processedFiles;
   }

}
