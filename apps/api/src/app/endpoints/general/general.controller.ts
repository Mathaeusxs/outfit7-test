import { Controller, Get, Req } from "@nestjs/common";
import { GeneralService } from "./general.service";
import { ApiTags } from "@nestjs/swagger";
import type { Request } from "express";

@ApiTags("General")
@Controller("general")
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get("ip-auth")
  async IPAuth(@Req() req: Request) {
    return await this.generalService.IPAuth(req.ip);
  }
}
