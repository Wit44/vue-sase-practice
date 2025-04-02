import type { FlightModel } from "@/models/flight.model";
import { MainService } from "./main.service";



export class FlightService {
    static async getFlights() {
        return await MainService.useAxios<FlightModel[]>('/flight')
    }

    static async getFlightById(id: number) {
        return await MainService.useAxios<FlightModel>(`/flight/${id}`)
    }
}