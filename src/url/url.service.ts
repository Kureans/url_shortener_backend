import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
  shortenUrl(url: string) {
    return url;
  }
}
