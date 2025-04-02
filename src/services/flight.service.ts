import type { FlightModel } from "@/models/flight.model";
import axios from "axios";

const client = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Accept': 'application/json'
    },
    validateStatus: (status: number) => {
        return status === 200
    }
})

export class FlightService {
    static async getFlights() {
        return await client.get<FlightModel[]>('/flight')
    }

    static async getFlightById(id: number) {
        return await client.get<FlightModel>(`/flight/${id}`)
    }
}