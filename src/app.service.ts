import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async explain(body: any): Promise<any> {
    const openAiKey = this.configService.get<string>('OPEN_AI_KEY');
    const openAiOrgId = this.configService.get<string>('OPEN_AI_ORG_ID');
    const configuration = new Configuration({
      apiKey: openAiKey,
      organization: openAiOrgId,
    });
    const openai = new OpenAIApi(configuration);
    const prompt = body.prompt;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `
        What does this mean? simplify and list things i cannot do.
        ${prompt}
      `,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data;
  }
}
