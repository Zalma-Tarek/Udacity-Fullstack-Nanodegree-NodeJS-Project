# Image Processing API (Node + TS + express + Sharp + Jasmine)

## Features
- Resize images dynamically using URL query params
- Cache resized images in `assets/thumb`
- Middleware-based architecture
- Fully TypeScript
- Unit tests with Jasmine
- Auto-creates required folders
- Enterprise-ready structure (linting, formatting, tests)

## Usage
# 1-Place full-size images inside: assets/full
Example: assets/full/fjord.jpg
The server will generate resized versions in: assets/thumb
with this naming convention: <filename>_<width>x<height>.jpg
Example after processing: assets/thumb/fjord_200x200.jpg
# 2-Start the Server
npm start
http://localhost:3000
API Endpoint to resize an image: GET /api/process?filename=<name>&width=<w>&height=<h>
Example: http://localhost:3000/api/process?filename=fjord&width=300&height=300

## Build
npm run build 

## Test
npm run test  