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
import {
  ApiTags,
  ApiBearerAuth,
  ApiSecurity,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Url } from './entities/url.entity';

@ApiTags('url')
@ApiBearerAuth()
@ApiSecurity('x-api-key')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @ApiCreatedResponse({
    type: Url,
    description: 'Url has been created succesfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @UseGuards(AuthGuard(['api-key', 'auth']))
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
  @ApiOkResponse({
    type: Url,
    description: 'Url has been found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @UseGuards(AuthGuard(['api-key', 'auth']))
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
  @ApiOkResponse({
    type: String,
    description: 'Url has been found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
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
  @ApiOkResponse({
    description: 'Url has been updated succesfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @UseGuards(AuthGuard(['api-key', 'auth']))
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
  @ApiOkResponse({
    description: 'Url has been deleted succesfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @UseGuards(AuthGuard(['api-key', 'auth']))
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
