import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { Repository } from 'typeorm';
import { generateUID } from 'src/utils/nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectRepository(Url) private urlRepository: Repository<Url>) {}

  create(createUrlDto: CreateUrlDto) {
    const slug = generateUID();
    return this.urlRepository.save({ ...createUrlDto, slug });
  }

  findOne(slug: string) {
    return this.urlRepository.findOneBy({ slug });
  }

  async findBaseURL(slug: string) {
    const url = await this.urlRepository.findOneBy({ slug });
    if (!url) return null;
    await this.updateClicks(url);
    return url.baseUrl;
  }

  async updateClicks(url: Url) {
    const { baseUrl, clicks } = url;
    return this.urlRepository.update({ baseUrl }, { clicks: clicks + 1 });
  }

  update(slug: string, updateUrlDto: UpdateUrlDto) {
    return this.urlRepository.update({ slug }, updateUrlDto);
  }

  remove(slug: string) {
    return this.urlRepository.delete({ slug });
  }
}
