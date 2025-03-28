import type { FlightModel } from "./models/flight.model";

export function formatTime(iso: string) {
    return new Date(iso).toLocaleString('sr-RS', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })
}

export function destinationImage(flight: FlightModel){
    return `https://img.pequla.com/destination/${flight.destination.toLowerCase().split(' ')[0]}.jpg`
}