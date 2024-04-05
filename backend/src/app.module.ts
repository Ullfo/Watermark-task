import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatermarkModule } from './watermark/watermark.module';

@Module({
  imports: [WatermarkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
