import type { AirlineModel } from "@/models/airline.model";
import { MainService } from "./main.service";

export class AirlineService {
    static async getAirlines() {
        return await MainService.useAxios<AirlineModel[]>('/airline')
    }

    static async getAirlineById(id: number) {
        return await MainService.useAxios<AirlineModel>(`/airline/${id}`)
    }

    static async createAirline(model: any) {
        return await MainService.useAxios('/airline', 'post', model)
    }

    static async updateAirline(id: number, model: any){
        return await MainService.useAxios(`/airline/${id}`, 'put', model)
    }

    static async deleteAirline(id: number) {
        return await MainService.useAxios(`/airline/${id}`, 'delete')
    }
}