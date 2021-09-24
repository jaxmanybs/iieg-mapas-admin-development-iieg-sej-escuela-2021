import { environment } from './../../../../environments/environment';
import { Component, OnInit, KeyValueDiffers, Output, Input, EventEmitter, OnChanges, SimpleChanges, LOCALE_ID } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { formatDate } from '@angular/common';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { RequestService } from '../../services/request.service';
import { take } from 'rxjs/operators';

import { DatePipe } from '@angular/common';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults as defaultControls, FullScreen } from 'ol/control';
import 'ol/ol.css';

import 'rxjs/add/operator/map';
import { Logger } from '@syncfusion/ej2-angular-grids';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { equal } from 'assert';
import { equals } from 'ol/extent';
// import { url } from 'inspector';

import { Data } from '../../services/request.service';

declare var ol;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }],
})
export class MapComponent implements OnInit, OnChanges {


    // radio_buttons
    @Input() layer_case: string;

    public mensajeGoku: string;

    dateParam;
    parametro;
    layer_now;

    ////// COVID-19 ///////
    map: any;
    cvegeo;
    VIEW_PARAMS;
    @Input() date_siderbar;
    date_now;
    date_7;
    date_14;
    @Output() desde_el_hijo = new EventEmitter();
    @Output() desde_el_hijo2 = new EventEmitter();
    @Output() desde_el_hijo_map = new EventEmitter();

    public date_now_covid_service;

    jsonMap: any;

    url_dateNow: any;
    date_Now_covid = new Date();

    panelOpenState = false;

    @Input()
    cveSubsector = 311;

    @Input()
    empleoyees = '';

    myLayers = [];
    view;
    overlay;
    // actualizar capa

    @Input() dataFilter: string;
    source;
    params;

    myStyles = [
        `iieg:sej-mpios-2021`,
        'iieg:sej-med-sup',
        `iieg:sej-cap-trab`,
        `sej:sej-med-sup`,
        `sej:sej-cap-trab`,
        `${environment.workspaceIieg}:sinister_intersections`,
    ];

    // agregar capa de munnicipios para este producto
    geoserverLayers = [
        'iieg:mpios2012_lgtb',
        'iieg:med_sup',
        'iieg:cap_trab',
        'sej:med_sup',
        'sej:cap_trab',
    ];

    osmLayer: any;
    capTrab: any;
    medSup: any;
    municipios: any;
    defuncionesxmpio: any;

    urlIieg = `${environment.geoserverApi + '/' + environment.workspaceIieg + '/wms?'}`;
    urlCovid = `${environment.geoserverApi + '/' + environment.workspaceCovid + '/wms?'}`;
    // urlGraphics = `${environment.geoserverApi + '/' + environment.workspaceCovid + '/wms?' }`
    owsGraphics = `${environment.wfsService + '&' +
        environment.version + '&' +
        environment.requestFeature + '&' +
        environment.typeNameFechas + '&' +
        environment.maxFeatures + '&' +
        environment.outputJson}`;
    urlDate = `${environment.geoserverApi + '/' + environment.workspaceCovid + '/wms?'}`;
    owsDate = `${environment.wfsService + '&' +
        environment.version + '&' +
        environment.requestFeature + '&' +
        environment.typeNameFechas + '&' +
        environment.maxFeatures + '&' +
        environment.outputJson}`;

    //  END COVID-19
    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartColors = [
        {
            backgroundColor: ['#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C', '#C9388C'],
        },
        {
            backgroundColor: ['#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF', '#05ADBF'],
        }
    ];

    public barChartData: ChartDataSets[] = [];

    mensaje = 'Map!';
    myData = false;

    layer;

    firtsChange = false;

    show = true;


    arrPersonas: Data[];



    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService,
        private miDatePipe: DatePipe
    ) { }

    ngOnChanges(changes: SimpleChanges): void {

        console.log('OnChanges--this.dataFilter');

        console.log('dashboard ngOnChanges()');

        this._requestService.getData$().subscribe(data => {
            console.log('data');
            console.log(data);

            this.arrPersonas = data;
        });



        // console.log('this.dataFilter', this.dataFilter);

        if (this.firtsChange) {
            // console.log('if this.firtsChange');
            // console.log(this.firtsChange);

            switch (this.dataFilter) {
                case 'med-sup':
                    // this.municipios.getSource().updateParams({ STYLES: this.myStyles[1] });
                    // this.medSup.getSource().updateParams({ LAYERS: this.geoserverLayers[1], STYLES: this.myStyles[2] });
                    this.medSup.getSource().updateParams({ LAYERS: this.geoserverLayers[1] });
                    break;
                case 'cap-trab':
                    // this.municipios.getSource().updateParams({ STYLES: this.myStyles[2] });
                    // this.medSup.getSource().updateParams({ LAYERS: this.geoserverLayers[2], STYLES: this.myStyles[2] });
                    this.medSup.getSource().updateParams({ LAYERS: this.geoserverLayers[4] });
                    break;
                default:
                    break;
            }


        } else {
            // console.log('else this.firtsChange');
            // console.log(this.firtsChange);
            this.firtsChange = true;

        }



        // const viewparams = this.capTrab.getSource().getParams();

        // this.VIEW_PARAMS = this.dataFilter;

        // // console.log('viewparams before filter');
        // // console.log(viewparams);

        // viewparams.VIEWPARAMS = this.VIEW_PARAMS;

        // // console.log('viewparams after filter');
        // // console.log(viewparams);


        // this.capTrab.getSource().updateParams(viewparams);

    }

    ngOnInit(): void {

        this.createLayers();
        this.createMap();

        this._route.params.forEach(params => {
            console.log(params.link);

        });
        // this._route.params.forEach(params =>{

        //     this.layer = this._router.url.split('-')[1];
        //     var date_covid = new Date(params.date.split('-')[0]);
        //     this.parametro = params.date.split('-')[0]
        //     this.dateParam   = formatDate(date_covid,'yyyyMMdd', 'en-US');

        // const viewparams = this.sinister.getSource().getParams();

        // this.VIEW_PARAMS = this.dateParam;
        // viewparams.VIEWPARAMS = this.VIEW_PARAMS;
        // this.activosxmpio.getSource().updateParams(viewparams);

        //     // console.log(layer);


        //     switch(this.layer) {
        //         case 'act3': {
        //             this.municipios.setZIndex(1)
        //             // this.activosxmpio.getSource().updateParams({STYLES: this.myStyles[5]});
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[5], STYLES: this.myStyles[5]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('act');
        //             this.layer_now = 'Tasa';
        //             break;
        //         }
        //         case 'act2': {
        //             this.municipios.setZIndex(1)
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[0], STYLES: this.myStyles[0]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('act');
        //             this.layer_now = 'Activos';
        //             break;
        //         }
        //         case 'acu': {
        //             this.municipios.setZIndex(1)
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[1], STYLES:this.myStyles[0]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('acu');
        //             this.layer_now = 'Acumulados';
        //             break;
        //         }
        //         case 'def': {
        //             this.municipios.setZIndex(1)
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[2], STYLES:this.myStyles[2]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('def');
        //             this.layer_now = 'Defunciones';
        //             break;
        //         }
        //         case 'nac': {
        //             this.municipios.setZIndex(0)
        //             this.osmLayer.setZIndex(1)
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[3], STYLES:this.myStyles[3]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.0564,22.964]),
        //                 zoom: 5
        //             });
        //             this.map.setView(view)
        //             this.desde_el_hijo_map.emit('nac');
        //             this.layer_now = 'Nacional';
        //             break;
        //         }
        //         default: {
        //             this.activosxmpio.getSource().updateParams({LAYERS: this.geoserverLayers[0], STYLES: this.myStyles[0]});
        //             var view = new View({
        //                 center: ol.proj.fromLonLat([-103.4564,20.664]),
        //                 zoom: 7.8
        //             });
        //             // this.map.setView(view)
        //             this.desde_el_hijo_map.emit('act');
        //             this.layer_now = 'Activos';
        //             break;
        //         }
        //     }
        // })
    }

    // init() {
    //     this.createLayers();
    //     this.createMap();
    //     console.log(this.urlIieg);

    // }

    // resetChildForm() {

    //     this.show = false;

    //     setTimeout(() => {
    //         this.show = true;
    //         this.createMap();
    //     }, 100);
    // }

    enviarMensaje(mensajeVegeta) {
        this._requestService.enviar(mensajeVegeta);
    }

    verMensaje() {
        // take es un operador que hará que solo obtengamos el último valor
        // que tiene bulma$ almacenado. Si no lo usamos, cuando enviemos un mensaje
        // de cualquiera de los dos componentes, se mostrará automaticamente
        // en el que ya haya visto un mensaje anteriormente.
        this._requestService.bulma$.pipe(take(1))
            .subscribe(mensaje => this.mensajeGoku = mensaje);
    }

    updateData(value: boolean) {
        this._requestService.updateData(value);
    }

    createLayers() {
        this.osmLayer = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type': 'base',
            'opacity': 1.000000,
            source: new ol.source.XYZ({
                url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
            })
        });

        this.capTrab = new ol.layer.Image({
            title: 'Cap Trab',
            visible: true,
            source: new ol.source.ImageWMS({
                // url: this.urlIieg,
                // url: 'https://indices.jalisco.gob.mx/geoserver/iieg/wms?',
                url: 'http://10.9.4.208:8080/geoserver/sej/wms?',
                params: {
                    // LAYERS: this.geoserverLayers[2],
                    // STYLES: this.myStyles[1],
                    LAYERS: this.geoserverLayers[4],
                    STYLES: this.myStyles[4]
                },
                serverType: 'geoserver'
            })
        });
        this.capTrab.setZIndex(3);

        this.medSup = new ol.layer.Image({
            title: 'Media  Superior',
            visible: true,
            source: new ol.source.ImageWMS({
                // url: this.urlIieg,
                url: 'https://indices.jalisco.gob.mx/geoserver/iieg/wms?',
                // url: 'http://10.9.4.208:8080/geoserver/sej/wms?',
                params: {
                    LAYERS: this.geoserverLayers[1],
                    STYLES: this.myStyles[1],
                    // LAYERS: this.geoserverLayers[3],
                    // STYLES: this.myStyles[4],
                },
                serverType: 'geoserver'
            })
        });
        this.medSup.setZIndex(2);

        this.municipios = new ol.layer.Image({
            visible: true,
            source: new ol.source.ImageWMS({
                // url: this.urlIieg,
                url: 'https://indices.jalisco.gob.mx/geoserver/iieg/wms?',
                params: {
                    LAYERS: this.geoserverLayers[0],
                    STYLES: this.myStyles[0]
                },
                serverType: 'geoserver'
            })
        });
        this.municipios.setZIndex(1);

        this.view = new View({
            // center: ol.proj.fromLonLat([-103.5864,20.704]),
            // zoom: 7.5,
            // center: ol.proj.fromLonLat([-103.3564,20.564]),
            // zoom: 9
            center: ol.proj.fromLonLat([-103.5964, 20.874]),
            zoom: 7.6,
        });
    }

    createMap() {

        this.map = new Map({
            // controls: defaultControls().extend([
            //     new FullScreen({
            //         source: 'fullscreen'
            //     })
            // ]),
            controls: [],
            layers: [
                this.osmLayer,
                // this.capTrab,
                this.medSup,
                this.municipios,
            ],
            target: document.getElementById('map')
        });

        this.map.setView(this.view);
        // this.map.addControl(new ol.control.ZoomSlider());

        this.source = this.capTrab.getSource();
        this.params = this.source.getParams();

        this.map.on('singleclick', (event) => {

            console.log('click on map');
            this.callback(event);

        });
    }

    // updateMap(viewparam) {

    //     const viewparams = this.sinister.getSource().getParams();
    //     this.VIEW_PARAMS = 'aaaammdd:' + viewparam;

    //     viewparams.VIEWPARAMS = this.VIEW_PARAMS;
    //     this.sinister.getSource().updateParams(viewparams);
    // }

    callback(evt) {

        // const viewResolution = /** @type {number} */ (this.view.getResolution());
        const viewResolution = (this.view.getResolution());
        const url1 = this.medSup.getSource().getFeatureInfoUrl(
            evt.coordinate, viewResolution, 'EPSG:3857',
            { 'INFO_FORMAT': 'application/json' });

        fetch(url1).then(data => {
            return data.json();
        }).then(json => {

            console.log(json);

            //         try {

            //             json.features[0].properties['layers'] = this.sinister.getSource().getParams().LAYERS;
            //             json.features[0].properties['viewparams'] = this.sinister.getSource().getParams().VIEWPARAMS;

            //             this._requestService.updateCvegeo(json.features[0].properties.cvegeo);
            //             this._requestService.updateLayers(json.features[0].properties.layers);

            //             this.desde_el_hijo.emit(json.features[0].properties);
            //             this.date_now_covid_service = json.features[0].properties.date_now;

            //         } catch (error) {
            //             // console.log(error);
            //         }

            //         return null;
        });
    }

    // getDateNow() {
    //     this.url_dateNow = this.urlDate + this.owsDate;
    //     fetch(this.url_dateNow ).then(data => {
    //     return data.json();
    //     }).then(json => {
    //         try {
    //             let re = /Z/gi;
    //             let str = json.features[0].properties.date_now;
    //             this.date_Now_covid = str.replace(re, '');

    //             re = /-/gi;
    //             str = this.date_Now_covid;
    //             this.date_Now_covid = str.replace(re, '');

    //         } catch (error) {}

    //         return null;
    //     });
    // }

}
