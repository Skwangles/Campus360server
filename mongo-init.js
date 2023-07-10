// Connect to the 'campusvirtual' database
db = db.getSiblingDB('campusvirtual');

db.createUser(
    {
        user: "server",
        pwd: "test-password",
        roles: [
            {
                role: "readWrite",
                db: "campusvirtual"
            }
        ]
    }
);
//TODO: Default Types
//TODO: Default campus
//TODO: Default Areas

// Insert initial data
db.pointtypes.insertOne({ type: 'Normal'});
db.campus.insertOne({ name: 'Waikato University'});
db.room.insertOne({ name: 'G.0.1', occupants: ["David Bainbridge"], points: []});