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

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService,
        private miDatePipe: DatePipe,
        public dialog: MatDialog
    ) { }

    ngOnInit() { }


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
