import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private repo: Repository<Url>,
  ) {}

  async shortenUrl(longUrl: string) {
    const urlCode = nanoid(8);
    const rootPath = 'http://localhost:3000';
    try {
      let url = await this.repo.findOneBy({ longUrl });
      if (url) return url.shortUrl;

      const shortUrl = `${rootPath}/${urlCode}`;
      url = this.repo.create({
        urlCode,
        longUrl,
        shortUrl,
      });

      this.repo.save(url);
      return url.longUrl;
    } catch (error) {
      throw new UnprocessableEntityException('Server ran into an error');
    }
  }
}
