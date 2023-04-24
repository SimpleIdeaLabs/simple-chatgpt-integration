import { Controller, Get, Post, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index() {
    return {};
  }

  @Post('api/explain')
  async explainTermsOfUseSection(@Req() req: Request) {
    return await this.appService.explain(req.body);
  }
}
