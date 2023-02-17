import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateArticleDto } from './create-article.dto';
import { DeleteArticleDto } from './delete-article.dto';
import { UpdateArticleDto } from './update-article.dto';

@Controller('board') // routing path; http://localhost:3000/board
export class BoardController {
  // 서비스 주입
  constructor(private readonly boardService: BoardService) {}

  // 게시물 목록 가져오는 API
  @Get('/articles')
  async getArticles() {
    return await this.boardService.getArticles();
  }

  // 게시물 상세보기
  @Get('/articles/:id')
  async getArticleById(@Param('id') articleId: number) {
    return await this.boardService.getArticleById(articleId);
  }

  // 게시물 생성
  @Post('/articles')
  createArticle(@Body() data: CreateArticleDto) {
    return this.boardService.createArticle(
      data.title,
      data.content,
      data.password,
    );
  }

  // 게시물 수정
  @Put('/articles/:id')
  async updateArticle(
    @Param('id') articleId: number,
    @Body() data: UpdateArticleDto,
  ) {
    return await this.boardService.updateArticle(
      articleId,
      data.title,
      data.content,
      data.password,
    );
  }

  // 게시물 삭제
  @Delete('/articles/:id')
  async deleteArticle(
    @Param('id') articleId: number,
    @Body() data: DeleteArticleDto,
  ) {
    return await this.boardService.deleteArticle(articleId, data.password);
  }
}
