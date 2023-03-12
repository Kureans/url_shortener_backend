import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Url } from './url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
