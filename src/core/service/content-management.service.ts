import { Inject, Injectable } from '@nestjs/common';
import { VideoDAO } from '../dao/video.dao.interface';
import { ContentEntity, ContentType } from '../entity/content.entity';
import { MovieEntity } from '../entity/movie.entity';
import { VideoEntity } from '../entity/video.entity';
import { ThumbnailEntity } from '../entity/thumbnail.entity';
import { ContentRepository } from '@src/persistence/repository/content.repository';

export interface CreateContentData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  sizeInKb: number;
}

@Injectable()
export class ContentManagementService {
  constructor(private readonly contentRepository: ContentRepository) {}

  async createContent(
    createContentData: CreateContentData,
  ): Promise<ContentEntity> {
    const content = ContentEntity.createNew({
      title: createContentData.title,
      description: createContentData.description,
      type: ContentType.MOVIE,
      media: MovieEntity.createNew({
        video: VideoEntity.createNew({
          url: createContentData.url,
          sizeInKb: createContentData.sizeInKb,
          duration: 100,
        }),
        thumbnail: ThumbnailEntity.createNew({
          url: createContentData.thumbnailUrl,
        }),
      }),
    });

    console.log(content);
    await this.contentRepository.create(content);
    return content;
  }
}
