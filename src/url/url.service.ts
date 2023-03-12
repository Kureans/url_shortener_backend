import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { nanoid } from 'nanoid';
import { ShortenUrlDto } from './url.dto';
import { isURL } from 'class-validator';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private repo: Repository<Url>,
  ) {}

  async shortenUrl(url: ShortenUrlDto) {
    const { longUrl } = url;
    if (!isURL(longUrl)) {
      throw new BadRequestException('String has to be a valid URL');
    }
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
      return url.shortUrl;
    } catch (error) {
      throw new UnprocessableEntityException('Server ran into an error');
    }
  }

  async redirect(urlCode: string) {
    try {
      const url = await this.repo.findOneBy({ urlCode });
      if (url) return url;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Unable to find resource');
    }
  }
}
