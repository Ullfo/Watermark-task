# watermark **React + Nest.js**
### First container
 Here we can upload our files and also delete someone just clicking on it. Then press **Create watermark** to put a watermark on our images.

![photo1](image.png)
#### Also we can use DND to drop out files into the container

![photo1](image.png)
### Second container
Here we are Downloading our processed images.

![photo1](image.png)

## Build Setup 

#### In Backend and Frontend directories
```
$ npm i
```
#### Start Frontend side
```
$ npm run dev
```
#### Start Backend side
```
$ npm run start:dev
```

## Intersting in code
### React side
Here we create server connect and send POST request for sending files from useState **files** and after processing files on server side, we are taking them back to useSate **processedFiles**
```js
   const uploadFiles = async () => {
      const formData = new FormData();
      files.forEach((file) => { formData.append('files', file) });

      try {
         const res = await axios.post('http://localhost:3000/watermark', formData, {
            headers: {
               'Content-Type': 'multipart/form-data'
            }
         });

         //return processed files
         const processedFiles = res.data;
         setProcessedFiles(processedFiles);


      } catch (error) {
         console.error('Error uploading files:', error);
      }
   }
```


### Nest side
#### Controller:
The **Post** Method in Controller recives files from frontend, writes them to the buffer array and  runs them through the function **prepareImage** in Service, and sends the processed files back to frontend
``` ts
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
```
#### Service:
In the Service we go through each file in the array and, thanks to the (Sharp) library, combine our watermark and image. After that we convert buffer data to base64 data, that the frontend can understand our image urls, and return string array with urls back to Controller
```ts
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
```
