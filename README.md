# Simple WebServer Implementation in Node.js

This project is a Node.js application that provides weather information based on a visitor's IP address. It uses the Weather API to fetch the current temperature for a given location and the MaxMind GeoIP2 API to approximate the location from the IP address.

## Features

- Fetches weather information based on the visitor's location.
- Uses IP address to determine the visitor's approximate location.
- Handles cases where the IP address is localhost or not resolvable.

## Requirements

- Node.js (v14.x or later)
- A Weather API key from [WeatherAPI.com](https://www.weatherapi.com/)
- A MaxMind GeoIP2 account with access to the city database

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NICANORKYAMBA/Task-one.git
   cd Task-one
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   WEATHER_API_KEY=your_weather_api_key
   MAXMIND_ACCOUNT_ID=your_maxmind_account_id
   MAXMIND_LICENSE_KEY=your_maxmind_license_key
   ```

## Usage

### Starting the Server

To start the server, run:

```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

### API Endpoints

#### Get Weather Information

- **Endpoint:** `/api/hello`
- **Method:** `GET`
- **Query Parameters:**
  - `visitor_name` (string): The name of the visitor.

**Example Request:**

```http
GET /api/hello?visitor_name=Mark
```

**Example Response:**

```json
{
  "client_ip": "85.25.43.84",
  "location": "New York",
  "greeting": "Hello, Mark! The temperature is 25 degrees Celsius in New York."
}
```

## Project Structure

```plaintext
weather-api-project/
│
├── .env                    # Environment variables
├── app.js                  # Main application logic
├── server.js               # Server setup
├── getClientIp.js          # Function to get client IP address
├── getLocationFromIp.js    # Function to get location from IP address
├── weather.js              # Function to get weather information
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Functions

### `getClientIp(req)`

This function extracts the client's IP address from the request.

### `getApproximateLocationFromIp(ip)`

This function uses the MaxMind GeoIP2 API to get the approximate location based on the IP address.

### `getWeather(location)`

This function uses the Weather API to fetch the current temperature for the given location.

## Error Handling

The application includes basic error handling to ensure that any issues with fetching the location or weather information are caught and appropriately reported.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License.