import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FormatObject } from './dto-example';

@Controller("teste")
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello() {
    const teste = [
      {
        param1: 12,
        param2: "clara"
      },
      {
        param1: 13,
        param2: "mario"
      },
      {
        param1: 12,
        param2: "joão"
      }
    ]
    const objectTreated = teste.map(obj => new FormatObject(
      obj.param1,
      obj.param2
    ))
    console.log("a");
    return objectTreated;
  }
}
