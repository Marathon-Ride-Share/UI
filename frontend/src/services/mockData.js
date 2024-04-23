const rides = [
    {
        rideId: "RIDE123456",
        origin: {
            latitude: 31.2304,
            longitude: 121.4737,
            locationName: "Shanghai Tower"
        },
        destination: {
            latitude: 31.2243,
            longitude: 121.4847,
            locationName: "Jing'an Temple"
        },
        driverInfo: {
            driverName: "张伟",
            rating: 4.8
        },
        vehicle: {
            make: "Tesla",
            model: "Model 3",
            color: "Red",
            licensePlate: "沪A12345"
        },
        price: 120.5,
        startTime: "2024-04-21T15:30:00",
        endTime: "2024-04-21T16:15:00",
        status: "Completed",
        availableSeats: 3,
        passengers: [
            {
                passengerName: "李婷",
                pickupLocation: {
                    latitude: 31.2280,
                    longitude: 121.4759,
                    locationName: "People's Square"
                },
                paymentOrderId: "PAY987654321"
            }
        ]
    },
    {
        rideId: "RIDE234567",
        origin: {
            latitude: 31.2001,
            longitude: 121.4320,
            locationName: "Sun Moon Light Center"
        },
        destination: {
            latitude: 31.2084,
            longitude: 121.4689,
            locationName: "Xintiandi"
        },
        driverInfo: {
            driverName: "刘洋",
            rating: 4.5
        },
        vehicle: {
            make: "BYD",
            model: "Qin",
            color: "Blue",
            licensePlate: "沪B98765"
        },
        price: 80.0,
        startTime: "2024-04-21T17:00:00",
        endTime: "2024-04-21T17:45:00",
        status: "Scheduled",
        availableSeats: 4,
        passengers: []
    },
    {
        rideId: "RIDE345678",
        origin: {
            latitude: 31.2153,
            longitude: 121.4790,
            locationName: "Yu Garden"
        },
        destination: {
            latitude: 31.2333,
            longitude: 121.4880,
            locationName: "The Bund"
        },
        driverInfo: {
            driverName: "王小明",
            rating: 5.0
        },
        vehicle: {
            make: "Audi",
            model: "A6",
            color: "Black",
            licensePlate: "沪C65432"
        },
        price: 100.0,
        startTime: "2024-04-21T18:30:00",
        endTime: "2024-04-21T19:15:00",
        status: "In Progress",
        availableSeats: 2,
        passengers: [
            {
                passengerName: "张雷",
                pickupLocation: {
                    latitude: 31.2165,
                    longitude: 121.4761,
                    locationName: "Nanjing East Road"
                },
                paymentOrderId: "PAY123456789"
            }
        ]
    },
    {
        rideId: "RIDE345679",
        origin: {
            latitude: 31.2153,
            longitude: 121.4790,
            locationName: "Yu Garden"
        },
        destination: {
            latitude: 31.2333,
            longitude: 121.4880,
            locationName: "The Bund"
        },
        driverInfo: {
            driverName: "王小明",
            rating: 5.0
        },
        vehicle: {
            make: "Audi",
            model: "A6",
            color: "Black",
            licensePlate: "沪C65432"
        },
        price: 100.0,
        startTime: "2024-04-21T18:30:00",
        endTime: "2024-04-21T19:15:00",
        status: "In Progress",
        availableSeats: 2,
        passengers: [
            {
                passengerName: "张雷",
                pickupLocation: {
                    latitude: 31.2165,
                    longitude: 121.4761,
                    locationName: "Nanjing East Road"
                },
                paymentOrderId: "PAY123456789"
            }
        ]
    },
    {
        rideId: "RIDE345688",
        origin: {
            latitude: 31.2153,
            longitude: 121.4790,
            locationName: "Yu Garden"
        },
        destination: {
            latitude: 31.2333,
            longitude: 121.4880,
            locationName: "The Bund"
        },
        driverInfo: {
            driverName: "王小明",
            rating: 5.0
        },
        vehicle: {
            make: "Audi",
            model: "A6",
            color: "Black",
            licensePlate: "沪C65432"
        },
        price: 100.0,
        startTime: "2024-04-21T18:30:00",
        endTime: "2024-04-21T19:15:00",
        status: "In Progress",
        availableSeats: 2,
        passengers: [
            {
                passengerName: "张雷",
                pickupLocation: {
                    latitude: 31.2165,
                    longitude: 121.4761,
                    locationName: "Nanjing East Road"
                },
                paymentOrderId: "PAY123456789"
            }
        ]
    },
    {
        rideId: "RIDE345680",
        origin: {
            latitude: 31.2153,
            longitude: 121.4790,
            locationName: "Yu Garden"
        },
        destination: {
            latitude: 31.2333,
            longitude: 121.4880,
            locationName: "The Bund"
        },
        driverInfo: {
            driverName: "王小明",
            rating: 5.0
        },
        vehicle: {
            make: "Audi",
            model: "A6",
            color: "Black",
            licensePlate: "沪C65432"
        },
        price: 100.0,
        startTime: "2024-04-21T18:30:00",
        endTime: "2024-04-21T19:15:00",
        status: "In Progress",
        availableSeats: 2,
        passengers: [
            {
                passengerName: "张雷",
                pickupLocation: {
                    latitude: 31.2165,
                    longitude: 121.4761,
                    locationName: "Nanjing East Road"
                },
                paymentOrderId: "PAY123456789"
            }
        ]
    },    {
        rideId: "RIDE345681",
        origin: {
            latitude: 31.2153,
            longitude: 121.4790,
            locationName: "Yu Garden"
        },
        destination: {
            latitude: 31.2333,
            longitude: 121.4880,
            locationName: "The Bund"
        },
        driverInfo: {
            driverName: "王小明",
            rating: 5.0
        },
        vehicle: {
            make: "Audi",
            model: "A6",
            color: "Black",
            licensePlate: "沪C65432"
        },
        price: 100.0,
        startTime: "2024-04-21T18:30:00",
        endTime: "2024-04-21T19:15:00",
        status: "In Progress",
        availableSeats: 2,
        passengers: [
            {
                passengerName: "张雷",
                pickupLocation: {
                    latitude: 31.2165,
                    longitude: 121.4761,
                    locationName: "Nanjing East Road"
                },
                paymentOrderId: "PAY123456789"
            }
        ]
    },
    {
        rideId: "RIDE345682",
        origin: {
            latitude: 31.2153,
            longitude: 121.4790,
            locationName: "Yu Garden"
        },
        destination: {
            latitude: 31.2333,
            longitude: 121.4880,
            locationName: "The Bund"
        },
        driverInfo: {
            driverName: "王小明",
            rating: 5.0
        },
        vehicle: {
            make: "Audi",
            model: "A6",
            color: "Black",
            licensePlate: "沪C65432"
        },
        price: 100.0,
        startTime: "2024-04-21T18:30:00",
        endTime: "2024-04-21T19:15:00",
        status: "In Progress",
        availableSeats: 2,
        passengers: [
            {
                passengerName: "张雷",
                pickupLocation: {
                    latitude: 31.2165,
                    longitude: 121.4761,
                    locationName: "Nanjing East Road"
                },
                paymentOrderId: "PAY123456789"
            }
        ]
    }
    
];

// 这个rides数组现在可以在你的React组件或其他任何地方使用，模拟从服务器获取多个Ride的情况
export default rides;