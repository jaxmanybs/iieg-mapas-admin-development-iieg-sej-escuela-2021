import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { DateService } from './../../services/date.service';
import { SharedDataService } from '../shared-data.service';

interface ValueName {
    value: string;
    name: string;
    isDisable: boolean;
}

interface StartTimeZone {
    value: string;
    name: string;
}

interface EndTimeZone {
    value: string;
    name: string;
}

interface Town {
    value: string;
    name: string;
    isDisable: boolean;
}

@Component({
    selector: 'app-botton-sheet-example',
    templateUrl: './botton-sheet-example.component.html',
    styleUrls: ['./botton-sheet-example.component.scss']
})
export class BottonSheetExampleComponent implements OnInit {


    // filtrado

    nomTown = '';
    nomSchool = '';
    nomCareer = '';

    // minValue;
    // maxValue;

    // externalData = [];
    // minDateFilter = new Date(2019, 0, 1);
    // maxDateFilter = new Date(2019, 5, 30);


    @Output() desde_el_hijo_botton_sheet = new EventEmitter();

    formGroup: FormGroup = new FormGroup({

        region: new FormControl(''),
        municipio: new FormControl(''),
        nomSost: new FormControl(''),
        nomEscuela: new FormControl(''),
        carrera: new FormControl(''),

    });

    allViewParams = [];
    region: string;
    municipio: string;
    nomSost: string;
    nomEscuela: string;
    carrera: string;

    regiones: ValueName[] = [
        { value: '', name: 'Todos', isDisable: false },
        { value: '01', name: 'NORTE', isDisable: false },
        { value: '02', name: 'ALTOS NORTE', isDisable: false },
        { value: '03', name: 'ALTOS SUR', isDisable: false },
        { value: '04', name: 'CIENEGA', isDisable: false },
        { value: '05', name: 'SURESTE', isDisable: false },
        { value: '06', name: 'SUR', isDisable: false },
        { value: '07', name: 'SIERRA DE AMULA', isDisable: false },
        { value: '08', name: 'COSTA SUR', isDisable: false },
        { value: '09', name: 'COSTA-SIERRA OCCIDENTAL', isDisable: false },
        { value: '10', name: 'VALLES', isDisable: false },
        { value: '11', name: 'LAGUNAS', isDisable: false },
        { value: '12', name: 'CENTRO', isDisable: false },
    ];

    towns: ValueName[] = [
        { value: '', name: 'Todos', isDisable: false }
    ];

    nomSosts: ValueName[] = [
        { value: '', name: 'Todos', isDisable: false },
        // { value: 'AUTONOMO', name: 'AUTONOMO', isDisable: false },
        // { value: 'ESTATAL', name: 'ESTATAL', isDisable: false },
        // { value: 'FEDERAL', name: 'FEDERAL', isDisable: false },
        // { value: 'PARTICULAR', name: 'PARTICULAR', isDisable: false }
    ];

    nomEscuelas: ValueName[] = [
        { value: '', name: 'Todos', isDisable: false }
    ];

    carreras: ValueName[] = [
        { value: '', name: 'Todos', isDisable: false }
    ];


    date = new FormControl();
    date_now_covid;

    date_calendar = new Date();


    eventDatePicker: string;

    disableSelect = new FormControl(false);

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

        // switch(this.radioButton) {
        //     case 'mat-radio-3': {
        //         console.log('case mat-radio-3');
        //         this.casos = 3;
        //         break;
        //     }
        //     default: {
        //         console.log('Default - case mat-radio-2');
        //         this.casos = 2;
        //         break;
        //     }
        // }

        //    console.log('event.target.value');
        //    console.log(event.target.value);


        // this.eventDatePicker = (event.target.value.getFullYear().toString() + ', ' + (event.target.value.getMonth() + 1).toString()
        //    + ', ' + event.target.value.getDate().toString())
        // this.routerUrl = this._router.url.split('/2')[0]
        // this.routerUrlCheck = this.eventDatePicker+'-'+this._router.url.split('-')[1]
        // console.log(this.routerUrl, this.routerUrlCheck + this.casos);
        // this._router.navigate([this.routerUrl, this.routerUrlCheck + this.casos]);
        // this._router.navigate([this.routerUrl, this.routerUrlCheck]);
    }
    addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {

        //    console.log('event.target.value');
        //    console.log(event.target.value);
    }
    addEvent3(type: string, event: MatDatepickerInputEvent<Date>) {

        //    console.log('event.target.value');
        //    console.log(event.target.value);
    }
    addEvent4(type: string, event: MatDatepickerInputEvent<Date>) {

        //    console.log('event.target.value');
        //    console.log(event.target.value);
    }
    constructor(
        private router: Router,
        private _bottomSheetRef: MatBottomSheetRef<BottonSheetExampleComponent>,
        private dateService: DateService,
        private _sharedDataService: SharedDataService,

    ) {

        // console.log('contructor botton-sheet');

        this.filterTown('');
        this.filterNomSost('', '');
        this.filterSchool('', '', '');
        this.filterCarrer('', '', '', '', '', '', '');
        // this.filterSchool(this.nomSchool);
        // this.filterCarrer(this.nomCareer);

        // this.dateService.getTown(nomMun).subscribe(data => {

        //     data.features.forEach(feature => {

        //         const { municipio, nombre_municipio, isDisable } = feature.properties;
        //         this.towns.push({ value: municipio, name: nombre_municipio, isDisable });

        //     });

        //     // this.onSubmit();
        // });



        // this.dateService.getNomEscuelas(nomSchool).subscribe(data => {

        //     data.features.forEach(feature => {

        //         const { nombre_escuela, isDisable } = feature.properties;
        //         this.nomEscuelas.push({ value: nombre_escuela, name: nombre_escuela, isDisable });

        //     });

        // });

        // this.dateService.getCarreras(nomCareer).subscribe(data => {

        //     data.features.forEach(feature => {

        //         const { carrera, isDisable } = feature.properties;
        //         this.carreras.push({ value: carrera, name: carrera, isDisable });

        //     });

        // });

    }

    // aplica el filtrado hacia eldashboard
    sendDataFilter(event: MouseEvent): void {
        const dataFiltter = this.formGroup.value;

        this._bottomSheetRef.dismiss(dataFiltter);
        event.preventDefault();
    }

    ngOnInit(): void {

        // this.regiones.forEach((region) => {
        //     console.log('region', region);

        //     if (region.value === '01') {

        //     }

        // });

        this.formGroup.valueChanges.subscribe(data => {
            // console.log(data);
            console.log('region:', data.region);
            console.log('municipio:', data.municipio);
            console.log('nomSost:', data.nomSost);
            console.log('nomEscuela:', data.nomEscuela);
            console.log('carrera:', data.carrera);

            this.region = data.region;
            this.municipio = data.municipio;
            this.nomSost = data.nomSost;
            this.nomEscuela = data.nomEscuela;
            this.carrera = data.carrera;

            // console.log('this.region', this.region);


            // if (this.region !== '') {
            //     // console.log('region', this.region);
            //     this.filterTown(this.region, '');
            //     // this.filterNomSost('', '', '');

            // } else {
            //     this.filterTown('', '');
            //     this.filterNomSost('', '', '');
            // }

            this.filterTown(this.region);
            this.filterNomSost(this.region, this.municipio);
            this.filterSchool(this.region, this.municipio, this.nomSost);
            this.filterCarrer(this.region, this.municipio, this.nomSost, this.nomEscuela, '', '', '');


        });
    }

    filterTown(region) {
        this.towns = [];

        // console.log('filterTown()');

        if (region) {
            // console.log('if');
            this.towns.push({ value: '', name: 'Todos', isDisable: true });
        } else {
            // console.log('else');
            this.towns.push({ value: '', name: 'Todos', isDisable: false });
        }

        this.dateService.getTown(region).subscribe(data => {
            // console.log(data);

            data.features.forEach(feature => {
                // console.log(feature.properties);

                const { municipio, nombre_municipio, isDisable } = feature.properties;
                this.towns.push({ value: municipio, name: nombre_municipio, isDisable });
            });

        });
    }

    filterNomSost(region, nomMun) {
        this.nomSosts = [];

        if (region || nomMun) {
            this.nomSosts.push({ value: '', name: 'Todos', isDisable: true });
        } else {
            this.nomSosts.push({ value: '', name: 'Todos', isDisable: false });
        }

        this.dateService.getNomSost(region, nomMun).subscribe(data => {
            data.features.forEach(feature => {

                const { nom_sost, isDisable } = feature.properties;
                this.nomSosts.push({ value: nom_sost, name: nom_sost, isDisable });
            });
        });
    }

    filterSchool(region, nomMun, nomSost) {
        this.nomEscuelas = [];

        if (region || nomMun || nomSost) {
            this.nomEscuelas.push({ value: '', name: 'Todos', isDisable: true });
        } else {
            this.nomEscuelas.push({ value: '', name: 'Todos', isDisable: false });
        }

        this.dateService.getNomEscuelas(region, nomMun, nomSost).subscribe(data => {

            data.features.forEach(feature => {

                const { nombre_escuela, isDisable } = feature.properties;
                this.nomEscuelas.push({ value: nombre_escuela, name: nombre_escuela, isDisable });

            });

        });
    }

    filterCarrer(region, nomMun, nomSost, nomSchool, layer, cveProperty, cveSchool) {
        this.carreras = [];

        console.log('filterCarrer()');

        if (region || nomMun || nomSost || nomSchool) {
            console.log('if');
            this.carreras.push({ value: '', name: 'Todos', isDisable: true });
        } else {
            console.log('else');
            this.carreras.push({ value: '', name: 'Todos', isDisable: false });
        }

        this.dateService.getCarreras(region, nomMun, nomSost, nomSchool, layer, cveProperty, cveSchool).subscribe(data => {

            data.features.forEach(feature => {


                const { carreras, isDisable } = feature.properties;
                this.carreras.push({ value: carreras, name: carreras, isDisable });

            });

        });
    }

    onSubmit() {


        // this.cveSubsector = this.formGroup.value.subsector;
        // this.employee = this.formGroup.value.workers;

        // console.log('Filtrado ok');

        // this.service.getActivities(this.formGroup.value.subsector, this.formGroup.value.workers).subscribe(data => {
        //   var listAtivities = []
        //   data.features.forEach(element => {
        //     listAtivities.push(element.properties)
        //   });
        //   this.externalData = listAtivities
        // })
    }

}
