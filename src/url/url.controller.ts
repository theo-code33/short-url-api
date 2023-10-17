import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @UseGuards(AuthGuard('api-key'))
  async create(@Body() createUrlDto: CreateUrlDto) {
    try {
      if (!createUrlDto.baseUrl)
        throw new HttpException('Url is required', HttpStatus.BAD_REQUEST);
      if (!createUrlDto.user)
        throw new HttpException('User is required', HttpStatus.BAD_REQUEST);
      return this.urlService.create(createUrlDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':slug')
  @Post()
  @UseGuards(AuthGuard('api-key'))
  async findOne(@Param('slug') slug: string) {
    try {
      if (!slug)
        throw new HttpException('slug is required', HttpStatus.BAD_REQUEST);
      const url = await this.urlService.findOne(slug);
      if (!url) throw new HttpException('Url not found', HttpStatus.NOT_FOUND);
      return url;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':slug/baseUrl')
  async findBaseURL(@Param('slug') slug: string) {
    try {
      if (!slug)
        throw new HttpException('Slug is required', HttpStatus.BAD_REQUEST);
      const url = await this.urlService.findBaseURL(slug);
      if (!url) throw new HttpException('Url not found', HttpStatus.NOT_FOUND);
      return url;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':slug')
  @Post()
  @UseGuards(AuthGuard('api-key'))
  async update(
    @Param('slug') slug: string,
    @Body() updateUrlDto: UpdateUrlDto,
  ) {
    try {
      if (!slug)
        throw new HttpException('Slug is required', HttpStatus.BAD_REQUEST);
      if (!updateUrlDto.baseUrl)
        throw new HttpException('Url is required', HttpStatus.BAD_REQUEST);
      return await this.urlService.update(slug, updateUrlDto).then(() => {
        return this.urlService.findOne(slug);
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':slug')
  @Post()
  @UseGuards(AuthGuard('api-key'))
  remove(@Param('slug') slug: string) {
    try {
      if (!slug)
        throw new HttpException('Slug is required', HttpStatus.BAD_REQUEST);
      return this.urlService.remove(slug);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
