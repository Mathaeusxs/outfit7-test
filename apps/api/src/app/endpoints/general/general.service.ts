import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { environment } from "@environment";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GeneralService {
  constructor(private readonly http: HttpService) {}

  async IPAuth(ip: string) {
    const { path, user, pass, successCheck } = environment.countryAuth;

    const countryCode = await this.getCountryCodeFromIP(ip);
    if (!countryCode) {
      throw new HttpException(
        `Country code could not be determined: ${ip}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const resp = await firstValueFrom(
      this.http.get(path, {
        params: { countryCode: countryCode },
        auth: {
          username: user,
          password: pass,
        },
      }),
    );

    if (resp.data?.ads === successCheck) {
      return { countryCode, enableAds: true };
    }
    return { countryCode, enableAds: false };
  }

  async getCountryCodeFromIP(ip: string): Promise<string> {
    const { path } = environment.ipApi;
    const resp = await firstValueFrom(
      this.http.get(`${path}/${ip}`, { timeout: 5000 }),
    );
    return resp?.data?.countryCode;
  }
}
