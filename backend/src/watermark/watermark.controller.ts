import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { WatermarkService } from './watermark.service';

@Controller('watermark')
export class WatermarkController {
   constructor(private readonly watermarkService: WatermarkService) {}

   @Post('')
   @UseInterceptors(FilesInterceptor('files'))
   async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
     const watermarkPath = 'C:/Users/Admin/Desktop/wotermark task/backend/src/watermark/watermarkkk/160138.png';
   //   const outputFolder = 'C:/Users/Admin/Desktop/wotermark task/backend/src/watermark/processedIMG';

      const processedFiles = await this.watermarkService.prepareImage(files, watermarkPath);
      console.log(processedFiles);
      return processedFiles;
   }

}
