import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {

  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Folder to save uploaded files
      filename: (req, file, callback) => {
        const timestamp = Date.now();
        const fileExtName = extname(file.originalname);
        const fileName = `${timestamp}${fileExtName}`;
        callback(null, fileName);
      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = `uploads/${file.filename}`; // Path relative to project root
    return { message: 'File uploaded successfully', path: filePath };
  }
}
