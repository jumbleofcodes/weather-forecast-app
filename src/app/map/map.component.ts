import { WeatherService } from './../weather.service';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map: any;
  private marker = L.marker([0,0]);
  private data: any;
  constructor(private weatherService: WeatherService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.putMarkerOnMap();
  }

  //MAP 
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 41.8954656, 12.4823243 ],
      zoom: 6
    });
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  
  //PUT MARKER ON MAP
  putMarkerOnMap(){
    this.map.on("click", (e: { latlng: { lat: number; lng: number; }; }) => {
      console.log(e.latlng);
      if (this.marker) {
        this.map.removeLayer(this.marker);
      } 
      this.data = this.getWeatherData(e.latlng.lat, e.latlng.lng);
    });
  }

  getWeatherData(lat: any, lng: any){
    this.weatherService.getCurrentWeatherByCoordinates(lat,lng).subscribe((data: any) =>{
      console.log(data);
      this.marker = L.marker([lat, lng]).addTo(this.map).bindPopup(`` +
      `<div>City: ${ data.name }</div>` +
      `<div>State: ${ data.sys.country }</div>` +
      `<div>Temperature: ${ data.main.temp }°C</div>`).openPopup();
    })

  }

}
