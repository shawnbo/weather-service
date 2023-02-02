import moment from "moment";
import { API_KEY } from "../config";
import { Alert, WeatherApi, WeatherResponse } from "../types/Weather";
import * as httpUtility from "../utilities/httpUtility";


type Units = 'imperial' | 'metric';

type HttpParams = {
  lat: number | string;
  lon: number | string;
  appid: string;
  units?: Units;
};

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
function getCurrentAlerts(alerts?: Alert[]): Alert[] | undefined {
  if (!alerts) {
    return undefined;
  }

  return alerts.filter(alert => {
    return moment().isBetween(alert.start, alert.end);
  });
};

export async function getWeather(lat: string, lon: string): Promise<WeatherResponse> {
  if (!(lat && lon)) {
    throw new Error('Latatitude and longitude are required');
  }

  const params: HttpParams = { lat, lon, appid: API_KEY, units: 'imperial' };

  const data = await httpUtility.get<WeatherApi>(`https://api.openweathermap.org/data/2.5/weather`, { params });

  return {
    condition: data.weather[0]?.main,
    temperature: getTemperatureFeel(data.main.temp),
    hasAlerts: hasAlerts(data.alerts),
    currentAlerts: getCurrentAlerts(data.alerts)
  };
};