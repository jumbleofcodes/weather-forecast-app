import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from './model/weather';

const url = 'http://api.openweathermap.org/data/2.5/';
const apiKey = '328341f9759f1c459ea2fbc90b71533e';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  constructor(private http: HttpClient) { }

  getCurrentWeatherByCoordinates(lat: number, lng: number): Observable<Weather> {
    return this.http.get<Weather>(`${url}weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`)
  }

  getForecastWeatherByCoordinates(lat: number, lng: number): Observable<Weather> {
    return this.http.get<Weather>(`${url}forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`)
  }
}