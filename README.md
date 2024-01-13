Overview
This is a React application that displays current weather information and a 5-day forecast based on either the user's geolocation or a city name entered in the search bar. The application utilizes the OpenWeatherMap API to fetch weather data.

Installation
To run the Weather App locally, follow these steps:

Clone the repository:
bash
Copy code
git clone <repository_url>
Install dependencies:
bash
Copy code
cd <project_folder>
npm install
Set up OpenWeatherMap API key:

Create an account on OpenWeatherMap to obtain an API key.
Create a .env file in the project root and add the following line:
env
Copy code
VITE_API_KEY=your_openweathermap_api_key
Run the application:

bash
Copy code
npm start
Features
Geolocation: The app uses the device's geolocation to get the current latitude and longitude coordinates.

Weather Data: It fetches current weather data and a 5-day forecast using the OpenWeatherMap API.

Search Functionality: Users can search for weather information by entering a city name in the search bar.

Temperature Conversion: The temperature is displayed in Celsius, converted from Kelvin.

Wind Direction: The wind direction is displayed in cardinal points (N, NE, E, SE, S, SW, W, NW).

Usage
Upon opening the app, it will attempt to fetch the user's geolocation and display the current weather information.

Users can enter a city name in the search bar and click the search icon to get weather information for that city.

The main section of the app displays current weather details, including temperature, maximum and minimum temperatures, humidity, visibility, and wind speed.

The 5-day forecast is displayed below, showing weather icons, descriptions, temperatures, and dates.

Dependencies
React: A JavaScript library for building user interfaces.
@react-native-community/geolocation: A library for accessing device geolocation data in React Native applications.
axios: A promise-based HTTP client for making API requests.
react-icons/io5: Icon components for React.
