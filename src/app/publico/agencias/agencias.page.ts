import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras,ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Usuario } from '../../domain/usuario';
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
usrLoggAgencias: Usuario = new Usuario();
constructor(private route: ActivatedRoute,private locationService: LocationService, private router: Router) { 
    route.queryParams.subscribe(params => {
      //console.log(params)
      if (this.router.getCurrentNavigation().extras.queryParams){
        this.usrLoggAgencias=this.router.getCurrentNavigation().extras.queryParams.usr;     
        //console.log(this.usrLoggAgencias.cedula)
      }
  })
}
zoom = 15;
lat = -2.9086648419669126;
lng = -79.03865656101168;

lat2 = -2.892347256941089;
lng2 = -78.99324529764924;

lat3 = -2.8607955073398204;
lng3 = -78.98669166230765;

lat4 = -2.856988230514528;
lng4 = -78.92749961330087;

totalM :any;
totalT :any;
totalC :any;
totalMa :any;
currentLocation: any;
centerLocation:any= {
  latitude: null,
  longitude: null,
};

public menuConductores = [
  { icon: 'home-outline', nombre: 'Inicio',path:'publico/principalConductores'},
  { icon: 'clipboard-outline', nombre: 'Multas e Infracciones',path:'publico/mismultas'},
  { icon: 'business-outline', nombre: 'Agencias EmovEP',path:'publico/agencias'},
  { icon: 'car-outline', nombre: 'Matriculacion Vehicular',path:'publico/principalConductores'},
  { icon: 'earth-outline', nombre: 'Revicion Tecnica Vehicular',path:'publico/principalConductores'},
  { icon: 'document', nombre: 'Comprobante de pago',path:'publico/comprobante'},
  { icon: 'people-outline', nombre: 'Acerca de',path:'publico/acerca-de'},
  { icon: 'mail-outline', nombre: 'Contactenos',path:'publico/contactenos'},
];
async ngOnInit() {
  this.currentLocation=await this.locationService.getCurrentLocation();
  //console.log(this.currentLocation);
}
calculateDistance(lon1:any, lon2:any, lat1:any, lat2:any){
  let p = 0.017453292519943295;
  let c = Math.cos;
  let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((lon1- lon2) * p))) / 2;
  let dis = (12742 * Math.asin(Math.sqrt(a)));
  return (dis).toFixed(2);
}
newAddressM(event: any){
  if(event){
    this.centerLocation.latitude=event.lat;
    this.centerLocation.longitude=event.lng;
    this.locationService.getAddressOfLocation(this.centerLocation);
    
    this.totalM=this.calculateDistance(event.lng,this.lng,event.lat,this.lat);
    
    //console.log(this.centerLocation)
  }
}
newAddressT(event: any){
  if(event){
    this.centerLocation.latitude=event.lat;
    this.centerLocation.longitude=event.lng;
    this.locationService.getAddressOfLocation(this.centerLocation);
    this.totalT=this.calculateDistance(event.lng,this.lng2,event.lat,this.lat2);
  //  console.log(this.centerLocation)
  }
}
newAddressMa(event: any){
  if(event){
    this.centerLocation.latitude=event.lat;
    this.centerLocation.longitude=event.lng;
    this.locationService.getAddressOfLocation(this.centerLocation);
    this.totalMa=this.calculateDistance(event.lng,this.lng3,event.lat,this.lat3);
   // console.log(this.centerLocation)
  }
}
newAddressC(event: any){
  if(event){
    this.centerLocation.latitude=event.lat;
    this.centerLocation.longitude=event.lng;
    this.locationService.getAddressOfLocation(this.centerLocation);
    this.totalC=this.calculateDistance(event.lng,this.lng4,event.lat,this.lat4);
   // console.log(this.centerLocation)
  }
}
navegar(nombre: any){
  //console.log(nombre)
  let params: NavigationExtras ={
    queryParams: {
      usr: this.usrLoggAgencias
    }
  }
  this.router.navigate([nombre],params)
}
}
