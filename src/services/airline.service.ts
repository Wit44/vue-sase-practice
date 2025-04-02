import type { AirlineModel } from "@/models/airline.model";
import { MainService } from "./main.service";

export class AirlineService {
    static async getAirlines(){
        return await MainService.useAxios<AirlineModel[]>('/airline')
    }
}