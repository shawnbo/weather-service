import moment from "moment";
import { API_KEY } from "../config";
import { HttpUtilityOptions } from "../types/Http";
import { Alert, CurrentAlert, HttpParams, TemperatureOptions, WeatherApi, WeatherResponse } from "../types/Weather";
import * as httpUtility from "../utilities/httpUtility";


type Temperature = 'hot' | 'moderate' | 'cold';
// convert temperature to string value
function getTemperatureFeel(temp: number): Temperature {
  if (temp >= 80) {
    return 'hot';
  }

  if (temp >= 50) {
    return 'moderate';
  }

  return 'cold';
};

// check to see if there are any alerts
function hasAlerts(alerts?: Alert[]): boolean {
  return Boolean(alerts && alerts.length);
}

// check to see if there any active alerts based on time
function getCurrentAlerts(alerts?: Alert[]): CurrentAlert[] | undefined {
  if (!alerts) {
    return undefined;
  }

  const filteredAlerts = alerts.filter(alert => {
    return moment().isBetween(alert.start, alert.end);
  });

  return filteredAlerts.map((alert) => {
    return {
      event: alert.event
    };
  });
};

// main get weather service that uses the http utility to send a get request
export async function getWeather(lat: string, lon: string): Promise<WeatherResponse> {
  if (!(lat && lon)) {
    throw new Error('Latatitude and longitude are required');
  }

  const options: HttpUtilityOptions = { params: { lat, lon, appid: API_KEY, units: 'imperial' } };

  const data = await httpUtility.get<WeatherApi>(`https://api.openweathermap.org/data/2.5/weather`, options);

  return {
    condition: data.weather[0]?.main,
    temperature: getTemperatureFeel(data.main.temp),
    hasAlerts: hasAlerts(data.alerts),
    currentAlerts: getCurrentAlerts(data.alerts)
  };
};