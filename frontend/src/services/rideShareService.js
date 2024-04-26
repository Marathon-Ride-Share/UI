const RideShareURL = "http://localhost:8090/rides";

const createRide = async (rideDetails) => {
  console.log("rideDetails:", rideDetails);
  const response = await fetch(`${RideShareURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rideDetails),
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} message: ${response.statusText}`
    );
  }

  return await response.json();
};

const findRidesNearby = async (searchRequest) => {
  console.log("searchRequest:", searchRequest);
  const response = await fetch(`${RideShareURL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchRequest),
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} message: ${response.statusText}`
    );
  }

  return await response.json();
};

const bookRide = async (bookRideRequest) => {
  console.log(bookRideRequest);
  console.log(bookRideRequest.userName);
  console.log(bookRideRequest.rideId);
  console.log(bookRideRequest.pickupLocation);
  const response = await fetch(`${RideShareURL}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookRideRequest),
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} message: ${response.statusText}`
    );
  }

  return await response.json();
};

const startRide = async (rideId, startTime) => {
  console.log("Starting ride with ID:", rideId, "at time:", startTime);
  const response = await fetch(`${RideShareURL}/${rideId}/start`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startTime }),
  });

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status} message: ${response.statusText}`
    );
  }

  return await response.json();
};

const completeRide = async (rideId, completeTime) => {
  console.log("Starting ride with ID:", rideId, "at time:", completeTime);
  const response = await fetch(`${RideShareURL}/${rideId}/complete`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completeTime }),
  });

  if (!response.ok) {
    throw new Error(
        `HTTP error! status: ${response.status} message: ${response.statusText}`
    );
  }

  return await response.json();
};

export { createRide, findRidesNearby, startRide, completeRide, bookRide };
