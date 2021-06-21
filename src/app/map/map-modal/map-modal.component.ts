import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Employee } from 'src/app/employee/Employee';
import { AgmCoreModule } from '@agm/core';
import { AgmMap } from '@agm/core';
import { Loader } from '@googlemaps/js-api-loader';


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.css'],
})
export class MapModalComponent implements OnInit,AfterViewInit  {
  @ViewChild(AgmMap)
  public agmMap!: AgmMap;

  constructor() {}



  ngAfterViewInit(): void {


  }
  employee!: Employee;
  employees!: Employee[];
  lat: number = 40.712776;
  lng: number = -74.005974;
  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyCkivNwUfiTlFT83nrKO5mZU-QpSCNilso',
    });
    var map!: any;
    loader.load().then(() => {
      this.initMap();
    });
    // var splitted = "40.712776 -74.005974 ".split(" ");
  }

  initMap(): void {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 3,
        center: { lat: 37.77, lng: -122.447 },
      }
    );
    directionsRenderer.setMap(map);

    for (var emp of this.employees) {
      this.calculateAndDisplayRoute(
        directionsService,
        directionsRenderer,
        emp
      );
    }
  }

  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    emp: Employee
  ) {
    var selectedMode = 'DRIVING';
    if (emp.empHasCar) {
      const selectedMode = 'DRIVING';
    }
    else{
      const selectedMode = 'WALKING';
    }
    var coordinates = this.employee.empAddress!.split(' ');
    var empMarker = { lat: +coordinates[0], lng: +coordinates[1] };

    var otherCoordinates = emp.empAddress!.split(' ');
    var otherEmpMarker = { lat: +otherCoordinates[0], lng: +otherCoordinates[1] };

    directionsService.route(
      {
        origin: empMarker,
        destination: otherEmpMarker,

        // @ts-ignore
        travelMode: google.maps.TravelMode[selectedMode],
      },
      (response, status) => {
        if (status == 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  }
}
