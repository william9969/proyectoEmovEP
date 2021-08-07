import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.page.html',
  styleUrls: ['./agencias.page.scss'],
})
export class AgenciasPage implements OnInit {
//EMOV MISICATA lat=-2.9086648419669126 long=-79.03865656101168
// EMOV Terminal lat: -2.892347256941089 long: -78.99324529764924
//EMOV MAYANCELA  lat: -2.8607955073398204  long: -78.98669166230765
// EMOV Capulispambaa lat: -2.856988230514528 long: -78.92749961330087
icons = {
  client: "https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_location-48.png",
  shop: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png",
  center: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Inside-Chartreuse.png",
  pointer: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Ball-Azure.png"
};
constructor(private locationService: LocationService) { }
centerLocation:any= {
  latitude: null,
  longitude: null,
};
public menuConductores = [
  { icon: 'home-outline', nombre: 'Inicio'},
  { icon: 'clipboard-outline', nombre: 'Multas e Infracciones'},
  { icon: 'business-outline', nombre: 'Agencias EmovEP'},
  { icon: 'car-outline', nombre: 'Matriculacion Vehicular'},
  { icon: 'earth-outline', nombre: 'Revicion Tecnica Vehicular'},
  { icon: 'people-outline', nombre: 'Acerca de'},
  { icon: 'mail-outline', nombre: 'Contactenos'},
];
ngOnInit() {
}
newAddress(event: any){
  if(event){
    this.centerLocation.latitude=event.lat;
    this.centerLocation.longitude=event.lng;
    this.locationService.getAddressOfLocation(this.centerLocation);
    console.log(this.centerLocation)
  }
}
}
