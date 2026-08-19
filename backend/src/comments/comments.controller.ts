import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/auth.guard';
import { CurrentUser } from '../common/auth.decorator';
import { CommentsService } from './comments.service';
@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private s: CommentsService) {}
  @Get(':taskId') all(@Param('taskId') id: string) {
    return this.s.all(id);
  }
  @Post(':taskId') create(@CurrentUser() u: any, @Param('taskId') id: string, @Body() d: any) {
    return this.s.create(id, u.sub, u.name || 'User', d);
  }
}
