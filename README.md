

# Setup
Navigate to the package.json directory
`docker compose up --build -d`

# Start

`yarn start`

# DB

Admin: `mongodb://admin:password@localhost:27017/`  
Default connection string: `mongodb://server:test-password@localhost:27017/campusvirtual`

# API

/api-docs  

## All endpoints follow the standard CRUD format (get, post, patch, delete)
/images - or /images/*uuid* to work on an individual value
/points  
/pointtypes  
/areas  
/rooms  
/campuses  

### Models

#### Image - POV image of points - separated for efficiency and decoupling things which potentially could be separate
  name: { type: String, required: true },  
  base64: { type: String, required: true }  

#### Area - floorplan image
  name: { type: String, required: true },  
  base64: { type: String, required: true }  

#### Point type - usable as a 'disabled access', or some special type of point - e.g. 'stairs' or something
  type: { type: String, required: true }  

#### Point - The actual image locations for navigation
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },  
  pan_offset: { type: Number, default: 0 },  
  tilt_offset: { type: Number, default: 0 },  
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'PointType', required: true },  
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Point' }],  
  x: { type: Number, required: true },  
  y: { type: Number, required: true },  
  area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },  
  campus: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus', required: true }  

#### Campus - the general 'grouping' of the tours
  name: { type: String, required: true }  

#### Room - points which 'points' are associated with that room
  name: { type: String, required: true },  
  occupants: [{ type: String }],  
  points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Point' }]  


