import { Component, EventEmitter, LOCALE_ID, OnInit, Output, ViewEncapsulation, OnChanges, SimpleChanges, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RequestService } from '../../services/request.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { take } from 'rxjs/operators';
import { DialogNotaMetodComponent } from '../dialog-nota-metod/dialog-nota-metod.component';
import { toggleSidebar } from '../topnav/topnav.component';
import { MatRadioChange } from '@angular/material/radio';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }],

})
export class SidebarComponent implements OnInit {

    selectedOptions: string[] = ['med-sup'];

    // favoriteSeason: string = "Total";
    // radioButton: string = "mat-radio-2";
    // seasons: string[] = ['Total', 'Tasa 10,000 habitantes'];

    // casos;
    // routerUrl: string;
    // routerUrlCheck: string ;

    // public showMenu: string;

    // public mensajeVegeta: string;

    // public parametro;

    // mensaje = 'Sidebar!!';

    // myData: string;

    // minDate = new Date(2020, 3, 26);
    // date_now_covid;
    // maxDate = new Date();
    // date_calendar = new Date();

    // datos_sidebar;

    // date = new FormControl();
    // serializedDate = new FormControl((new Date()).toISOString());

    // @Output() mydate = new EventEmitter<any>();

    // eventDatePicker: string;

    // addEvent(type: string, event: MatDatepickerInputEvent<Date>) {

    //     // switch(this.radioButton) {
    //     //     case 'mat-radio-3': {
    //     //         console.log('case mat-radio-3');
    //     //         this.casos = 3;
    //     //         break;
    //     //     }
    //     //     default: {
    //     //         console.log('Default - case mat-radio-2');
    //     //         this.casos = 2;
    //     //         break;
    //     //     }
    //     // }

    //     this.eventDatePicker = (event.target.value.getFullYear().toString() + ', ' + (event.target.value.getMonth() + 1).toString()
    // + ', ' + event.target.value.getDate().toString());
    //     this.routerUrl = this._router.url.split('/2')[0];
    //     this.routerUrlCheck = this.eventDatePicker + '-' + this._router.url.split('-')[1];
    //     // console.log(this.routerUrl, this.routerUrlCheck + this.casos);
    //     // this._router.navigate([this.routerUrl, this.routerUrlCheck + this.casos]);
    //     this._router.navigate([this.routerUrl, this.routerUrlCheck]);
    // }

    // radioChange(event: MatRadioChange) {
    //     // console.log(event);
    //     // console.log(event.value);
    //     // console.log(event.source.id);
    //     this.radioButton = event.source.id;
    //     // console.log(this.radioButton);
    //     // var casos;
    //     switch(this.radioButton) {
    //         case 'mat-radio-3': {
    //             // console.log('case mat-radio-3');
    //             this.casos = 3;
    //             break;
    //         }
    //         default: {
    //             // console.log('Default - case mat-radio-2');
    //             this.casos = 2;
    //             break;
    //         }
    //     }
    //     // this.routerUrlCheck[0]casos
    //     // console.log(this.routerUrl +  this.routerUrlCheck + this.casos);

    //     this._router.navigate([this.routerUrl, this.routerUrlCheck + this.casos]);

    //     //this.filter['property'] = this.selected;
    //     //console.log(this.filter);
    // }
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService,
        private miDatePipe: DatePipe,
        public dialog: MatDialog
    ) {

        // switch(this.radioButton) {
        //     case 'mat-radio-3': {
        //         // console.log('case mat-radio-3');
        //         this.casos = 3;
        //         break;
        //     }
        //     default: {
        //         // console.log('Default');
        //         this.casos = 2;
        //         break;
        //     }
        // }
        // this._requestService.getDate().subscribe(data => {

        //     data.features.forEach(feature => {

        //     var re = /Z/gi;
        //     var str = feature.properties.date_now;
        //     this.date_now_covid = str.replace(re, "");

        //     re = /-/gi;
        //     str = this.date_now_covid;
        //     this.date_now_covid = str.replace(re, ", ");

        //     this.maxDate = new Date(this.date_now_covid);
        //     this.date = new FormControl(this.maxDate);

        //     this.eventDatePicker = this.date_now_covid;
        //     // this._router.navigate(['/activos', this.eventDatePicker+'-act' + this.casos]);
        //     this._router.navigate(['/activos', this.eventDatePicker+'-act']);

        //     })
        // }
        // ,
        // error => {
        //     if(!<any>error.ok){
        //         this._requestService.getDateNow().subscribe(data => {

        //             data.features.forEach(feature => {

        //             var re = /Z/gi;
        //             var str = feature.properties.date_now;
        //             this.date_now_covid = str.replace(re, "");

        //             re = /-/gi;
        //             str = this.date_now_covid;
        //             this.date_now_covid = str.replace(re, ", ");

        //             this.maxDate = new Date(this.date_now_covid);
        //             this.date = new FormControl(this.maxDate);

        //             this.eventDatePicker = this.date_now_covid;
        //             // this._router.navigate(['/activos', this.eventDatePicker+'-act' + casos]);

        //             this.routerUrl = '/activos'
        //             this.routerUrlCheck = this.eventDatePicker+'-act'
        //             // console.log(this.routerUrl, this.routerUrlCheck + this.casos);
        //             // this._router.navigate([this.routerUrl, this.routerUrlCheck + this.casos]);
        //             this._router.navigate([this.routerUrl, this.routerUrlCheck]);

        //             })
        //         })
        //     }

        // })

    }

    ngOnInit() {
        // this.showMenu = '';
    }


    toggleSidebar() { toggleSidebar(); }

    openDialog() {
        this.dialog.open(DialogNotaMetodComponent);
    }
    ///////////////// no se utiliza hasta ahorita /////////////////////////////////////////////////////////////////////////////////
    // enviarMensaje(mensajeGoku) {
    //     this._requestService.enviar(mensajeGoku);
    // }

    // verMensaje() {
    //     this._requestService.bulma$.pipe(take(1)).
    //                                 subscribe(mensaje => this.mensajeVegeta = mensaje);
    // }

    // updateData(value: boolean) {
    //     this._requestService.updateData(value);
    // }

    // cambiarNombre() {
    //   // console.log(this.maxDate);
    //   // this._requestService.nombre$.emit('sidebar')

    //     this.mydate.emit(this.maxDate);

    // }

    getDateNow(urls) {
        // console.log('urls sidebar');
        // console.log(urls);
        // console.log('urls sidebar');
    }

    // addExpandClass(element: any) {
    //     if (element === this.showMenu) {
    //         this.showMenu = '0';
    //     } else {
    //         this.showMenu = element;
    //     }
    // }
}
