import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ShortenUrlDto } from './url.dto';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  shortenUrl(
    @Body()
    url: ShortenUrlDto,
  ): Promise<string> {
    return this.urlService.shortenUrl(url);
  }

  @Get(':code')
  async redirect(
    @Res() res: any,
    @Param('code')
    code: string,
  ) {
    const url = await this.urlService.redirect(code);
    if (url) return res.redirect(url.longUrl);
    return res.send('Link Not Found');
  }
}
