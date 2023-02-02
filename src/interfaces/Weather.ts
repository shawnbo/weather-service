export interface WeatherApi {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  alerts?: Alert[];
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  sunrise: number;
  sunset: number;
}

export interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: any[];
}

export interface CurrentAlert {
  event: string;
}

export interface WeatherResponse {
  condition: string;
  temperature: string;
  hasAlerts: boolean;
  currentAlerts?: CurrentAlert[];
}

export interface HttpParams {
  lat: number | string;
  lon: number | string;
  appid: string;
  units?: 'imperial' | 'metric';
}

export interface TemperatureOptions {
  temperature: 'hot' | 'moderate' | 'cold';
}