// CreateRideRequestModel.js
export default class CreateRideRequest {
    constructor(userName, origin, destination, startTime, price, availableSeats) {
        this.userName = userName;
        this.origin = origin;
        this.destination = destination;
        this.startTime = startTime;
        this.price = price;
        this.availableSeats = availableSeats;
    }
}