const RideShareURL = 'http://localhost:8090/api/rides/';

const createRide = async (rideDetails) => {
    console.log('rideDetails:', rideDetails);
    const response = await fetch(`${RideShareURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rideDetails)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    }

    return await response.json();
};

const findRidesNearby = async (searchRequest) => {
    console.log('searchRequest:', searchRequest);
    const response = await fetch(`${RideShareURL}search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchRequest)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    }

    return await response.json();
};

export { createRide, findRidesNearby };

