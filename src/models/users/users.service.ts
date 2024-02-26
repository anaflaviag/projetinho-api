import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserData } from "./interfaces/create-user";
import { HttpService } from "@nestjs/axios";
import { ExternalAddressData } from "./interfaces/external-address- data";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UsersService {
    constructor(
        private readonly requestService: HttpService
    ) { }

    async createUser(userBody: UserData) {
        let addressData: ExternalAddressData | any;
        try {
            const { data } = await lastValueFrom(
                this.requestService.get(`https://viacep.com.br/ws/${userBody.zipCode}/json`)
            );
            addressData = data;
        } catch (error) {
            console.log(error);
            throw new HttpException('Wrong zipCode or viacep internal error', HttpStatus.BAD_REQUEST);
        }
        return {
            message: "Data received with sucess",
            dataReceived: {
                ...userBody,
                address: addressData.logradouro,
                neighborhood: addressData.bairro,
                city: addressData.localidade,
                state: addressData.uf
            }
        };
    }
}
