import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as path from 'path';
import { buffer } from 'stream/consumers';

@Injectable()
export class WatermarkService {

   async prepareImage(files: Express.Multer.File[], watermarkPath: string): Promise<string[]> {
      const processedFiles: string[] = [];
      
       
      for (const file of files) {
         try {
            const processedImage = await sharp(file.buffer)
               .composite([{ input: watermarkPath }])
               .toBuffer();
            
            //convert buffer data to base64 data, that the frontend can understand our image urls
            const base64String = processedImage.toString('base64');
            const imageDataURL = `data:image/jpeg;base64,${base64String}`;
            processedFiles.push(imageDataURL);

         } catch (error) {
            console.error(`error smth on stage processedFile ${file.originalname}: ${error}`);
         }
      }
      
      return processedFiles;
   }

}

