import { Body, Controller, Post } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  shortenUrl(
    @Body()
    url: string,
  ): string {
    return this.urlService.shortenUrl(url);
  }
}
