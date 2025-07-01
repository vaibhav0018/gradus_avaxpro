import { Component, OnInit, ChangeDetectorRef, Inject, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { GeocodeService } from './geocode.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Location } from './location.model';
import { ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../../shared/share-material';
// Removed incorrect import for MouseEvent
declare var google : any;

@Component({
  selector: 'app-map-dialog-component',
  templateUrl: './map-dialog-component.component.html',
  styleUrls: ['./map-dialog-component.component.scss'],
  imports: [CommonModule,
    SharedMaterialModule
  ]

})
export class MapDialogComponentComponent implements AfterViewInit, OnInit {

  @ViewChild('search') public searchElementRef: ElementRef;

  modalTitle: string

  address: string = '';
  location: Location;
  latitude: number;
  longitude: number;
  zoom: number;
  // private geoCoder: google.maps.Geocoder; ------------------------------
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private geocodeService: GeocodeService,
    private ref: ChangeDetectorRef,
    private dialogRef: MatDialogRef<MapDialogComponentComponent>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
    this.modalTitle = data.title
    this.address = data.fullAddress
  }

  ngAfterViewInit() {
    this.searchElementRef.nativeElement.value = this.data.fullAddress
  }

  ngOnInit() {

    this.mapsAPILoader.load().then(() => {

      this.setCurrentLocation();

      // this.geoCoder = new google.maps.Geocoder(); -------------------------------------

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      console.log(" autocomplete ", autocomplete)

      autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {

          //get the place result
          let place = autocomplete.getPlace();
          console.log(" place  ", place)

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          console.log(" intiall lat ", this.latitude)

          this.longitude = place.geometry.location.lng();
          console.log(" intiall lan ", this.longitude)

          this.zoom = 8;
        });
      });
    });

  }

  // Get Location Coordinates
  setCurrentLocation() {
    console.log(" setCurrentLocation ")
    this.loading = true;
    this.geocodeService.geocodeAddress(this.address)
      .subscribe((location: Location) => {
        this.location = location;
        console.log(" this.location ", this.location)
        this.ref.detectChanges();
        this.latitude = this.location.lat;
        this.longitude = this.location.lng;
        this.zoom = 12;
      });
    this.loading = false;
  }
  markerDragEnd($event: any) {
    console.log("markerDragEnd     ", $event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
  }

  saveLocation() {
    let returnStr = this.latitude + "::" + this.longitude
    this.dialogRef.close(returnStr)
    this.ref.detectChanges();
  }

}
