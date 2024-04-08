import { Module } from '@nestjs/common';
import { WatermarkModule } from './watermark/watermark.module';

@Module({
  imports: [WatermarkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
