import { Module } from '@nestjs/common';
import { ContentModule } from './module/content.module';

@Module({
  imports: [ContentModule],
})
export class AppModule {}
