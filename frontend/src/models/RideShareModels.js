class CreateRideRequest {
  constructor(userName, origin, destination, startTime, price, availableSeats) {
    this.userName = userName;
    this.origin = origin;
    this.destination = destination;
    this.startTime = startTime;
    this.price = price;
    this.availableSeats = availableSeats;
  }
}

class SearchRidesRequest {
  constructor(location, datetime) {
    this.location = location;
    this.datetime = datetime;
  }
}

class BookRideRequest {
  constructor(userName, rideId, pickupLocation) {
    this.userName = userName;
    this.rideId = rideId;
    this.pickupLocation = pickupLocation;
  }
}

export { CreateRideRequest, SearchRidesRequest, BookRideRequest };
