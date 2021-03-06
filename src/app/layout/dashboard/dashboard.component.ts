import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { forkJoin, Subscription } from 'rxjs';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { DatePipe } from '@angular/common';

import { take } from 'rxjs/operators';
// services
import { RequestService } from '../services/request.service';
import { DateService } from './../services/date.service';

import { MatRadioChange } from '@angular/material/radio';

// import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LabelType, Options } from 'ng5-slider';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { BottonSheetExampleComponent } from './botton-sheet-example/botton-sheet-example.component';
import { SpinnerService } from '../services/spinner.service';
import { CalendarView, DAYS_OF_WEEK, CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';

interface Filter {
    value: string;
    viewValue: string;
}

interface Worker {
    value: string;
    name: string;
}
interface Career {
    career: string;
}

interface DataSchool {
    cveSchool: string;
    nomSchool: string;
    programa: string;
    careers: Career[];
    address: string;
    nomTown: string;
    zipCode: string;
    phoneNumber: string;
}

const colors: any = {
    blue1: {
        primary: '#2603c1',
        secondary: '#2603c1',
    },
    blue2: {
        primary: '#1e90ff',
        secondary: '#1e90ff',
    },
    yellow: {
        primary: '#fffb00',
        secondary: '#fffb00',
    },
};

const sinisterColors: any = {
    med_sup: '#e7004c',
    cap_trab: '#ffc600',
};
export interface Section {
    name: string;
    sinisterColor: string;
    sinisterIcon: string;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    // observable and subject
    data: string;
    formulario: FormGroup;

    //////////////////////// Sinisetralidad /////////////////////////////////
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
            xAxes: [{
                stacked: true,
                ticks: {
                    display: false,
                    // fontColor: 'rgba(255,255,255,0.1)',
                    // suggestedMax: 110,
                    // suggestedMin: -110
                },
                gridLines: {
                    display: false
                    // color: 'rgba(255,255,255,0.1)'
                },
                scaleLabel: {
                    display: true,
                    // labelString: 'Activos',
                },
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    // fontColor: 'rgba(255,255,255,0.1)',
                    // display: false,
                },
                gridLines: { color: 'rgba(255,255,255,0.1)' },
                scaleLabel: {
                    display: true,
                    labelString: 'Rango Edad',
                },
            }]
        },
        plugins: {
            datalabels: {
                anchor: 'center',
                // align: '',
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    // console.log(value);

                    return Math.abs(value) + '%';
                },
                color: 'white',
            }
        },
    };
    public barChartLabels: Label[] = ['60 +', '48-59', '38-47', '28-37', '18-27', '0-17'];
    public barChartType: ChartType = 'horizontalBar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    // return Math.abs(Math.round(parseInt(val, 10))) + "%";
    public barChartData: ChartDataSets[] = [
        {
            data: [-8, -57, -77, -19, -56, -7], label: 'Mujer',
            backgroundColor: ['#61568d', '#61568d', '#61568d', '#61568d', '#61568d', '#61568d', '#61568d', '#61568d', '#61568d', '#61568d', '#61568d'],
        },
        {
            data: [13, 59, 78, 8, 52, 8], label: 'Hombre',
            backgroundColor: ['#91b0d9', '#91b0d9', '#91b0d9', '#91b0d9', '#91b0d9', '#91b0d9', '#91b0d9', '#91b0d9', '#91b0d9', '#91b0d9', '#91b0d9'],
        },
    ];

    // LineChart
    public lineChartData: ChartDataSets[] = [
        { data: [5, 6, 7, 6, 6, 7, 5, 7, 8, 7, 6, 6], label: '2015' },
        { data: [4, 5, 5, 6, 7, 6, 5, 6, 7, 8, 7, 5], label: '2016' },
        { data: [8, 9, 10, 8, 12, 13, 11, 13, 13, 11, 12, 12], label: '2017' },
        { data: [5, 6, 7, 8, 11, 11, 10, 9, 10, 13, 11, 9], label: '2018' },
        { data: [2, 1, 5, 1, 1, 2, 4, 6, 2, 3, 2, 6], label: '2019' },
        // { data: [180, 480, 770, 90, 1000, 270, 400], label: '2019', yAxisID: 'y-axis-1' }
    ];
    public lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    public lineChartOptions: (ChartOptions & { annotation: any }) = {
        responsive: true,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left',
                },
                // {
                //   id: 'y-axis-1',
                //   position: 'right',
                //   gridLines: {
                //     color: 'rgba(255,0,0,0.3)',
                //   },
                //   ticks: {
                //     fontColor: 'red',
                //   }
                // }
            ]
        },
        annotation: {
            annotations: [
                {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 'March',
                    borderColor: 'orange',
                    borderWidth: 2,
                    label: {
                        enabled: true,
                        fontColor: 'orange',
                        content: 'LineAnno'
                    }
                },
            ],
        },
    };
    public lineChartColors: Color[] = [
        // $color-violet:       #61568d;
        // $color-blue:         #262840;
        // $color-blue-light:   #91b0d9;
        // $color-background:   #e5ebf7;
        // $color-orange:       #f2ae72;
        // $color-rose:         #f08077;
        { // 2015
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: '#61568d',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // 2016
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: '#262840',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // 2017
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: '#91b0d9',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // 2018
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: '#f08077',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // 2019
            backgroundColor: 'rgba(255, 255, 255, 0)',
            borderColor: '#f2ae72',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType: ChartType = 'line';
    public lineChartPlugins = [pluginAnnotations];

    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

    layerNow: boolean;
    // filtro por palabra
    selectedValue: string;
    selectedCar: string;

    filters: Filter[] = [
        { value: 'nomMunicipio', viewValue: 'Nombre Municipio' },
        { value: 'nomEscuela', viewValue: 'Nombre Escuela' },
        { value: 'carrera', viewValue: 'Carrera' }
    ];

    // filtrado med_sup
    totEscuelasMedSup = 0;
    totEstudiantesMedSup = 0;
    totHombresMedSup = 0;
    totMujeresMedSup = 0;

    // filtrado cap_trab
    totEscuelasCapTrab = 0;
    totEstudiantesCapTrab = 0;
    totHombresCapTrab = 0;
    totMujeresCapTrab = 0;

    // datos al clic en mapa
    dataSchools: any;
    dataSchool1: any;
    dataSchool2: any;
    careers: any;
    hasCarrer = 0;
    careers1: any;
    careers2: any;
    dataSchoolActive = false;
    dataSchoolActives = false;
    hombresClickMap1 = 0;
    mujeresClickMap1 = 0;
    hombresClickMap2 = 0;
    mujeresClickMap2 = 0;
    alumnosTotClickMap1 = 0;
    alumnosTotClickMap2 = 0;



    listarPaises: any[];
    intersections = 0;
    sinistries = 0;
    involved = 0;
    fatalities = 0;
    wounds = 0;

    minDateSelect = true;

    externalData = [];
    minDate1 = new Date(2017, 7, 31);
    maxDate1 = new Date(2020, 6, 30);
    minDate2 = new Date(2017, 7, 31);
    maxDate2 = new Date(2020, 6, 30);
    minHorary1 = new Date(2017, 7, 31);
    maxHorary1 = new Date(2020, 6, 30);
    minHorary2 = new Date(2017, 7, 31);
    maxHorary2 = new Date(2020, 6, 30);

    formGroupFilter: FormGroup = new FormGroup({
        start_date: new FormControl(''),
        end_date: new FormControl('', Validators.required),
        mun: new FormControl('', Validators.required),
        consequence: new FormControl('', Validators.required),
        user_type: new FormControl('', Validators.required),
        workers: new FormControl('', Validators.required)
    });

    // Escuela transparente
    // questionSelected;

    listSubsectors = [];

    empleoyee = 'all';
    cveSubsector = 311;

    //
    dataFilterDash;
    dataFilterDashMap;

    workers: Worker[] = [
        { value: 'all', name: 'Todos' },
        { value: '0 a 5', name: '0 a 5 personas' },
        { value: '6 a 10', name: '6 a 10 personas' },
        { value: '11 a 30', name: '11 a 30 personas' },
        { value: '31 a 50', name: '31 a 50 personas' },
        { value: '51 a 100', name: '51 a 100 personas' },
        { value: '101 a 250', name: '101 a 250 personas' },
        { value: '251', name: '251 y m??s personas' }
    ];

    // minValue
    // maxValue
    // options: Options = {
    //     floor: 0,
    //     ceil: 100,
    //     translate: (value: number, label: LabelType): string => {
    //     switch (label) {
    //         case LabelType.Low:
    //         return '<small>' + value + '</small>';
    //         case LabelType.High:
    //         return '<small>' + value + '</small>';
    //         default:
    //         return '<small>' + value + '</small>' ;
    //     }
    //     }
    // };

    date = new FormControl();
    date_now_covid;
    minDate = new Date();
    maxDate = new Date();
    date_calendar = new Date();


    eventDatePicker: string;
    // DatePickerRange
    // range = new FormGroup({
    //     start: new FormControl(),
    //     end: new FormControl()
    // });
    // Selects
    disableSelect = new FormControl(false);

    /////////////////////////////////////////////////////////////////////
    // radio_buttons
    favoriteSeason = 'Total';
    radioButton = 'total';
    seasons: string[] = ['Total', 'Tasa 10,000 habitantes'];
    casos = 2;
    routerUrl: string;
    routerUrlCheck: string;

    // graficas
    dataProperties;
    dataProperties7;
    dataProperties14;
    municipio = '';
    tot_cases_mun;
    tot_cases_mun_acum;
    date_covid;
    date_covid7;
    date_covid14;

    dateParamMap;
    cvegeo;
    // para defacumedades charbar2020
    pob_sex_hm_2020 = [];

    mensajeVegeta: string;

    parametro;

    dataHombres;
    data1;
    data2;
    data3;
    urlToday: string;
    urlSeven: string;
    urlFourteen: string;
    urlParams1 = 'https://indices.jalisco.gob.mx/geoserver/covid19/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=activosxmpiograf&LAYERS=activosxmpiograf&STYLES=covid19%3Aactivosxmpio&VIEWPARAMS=aaaammdd:';
    urlParams2 = '&INFO_FORMAT=application%2Fjson&I=50&J=50&CRS=EPSG%3A3857&WIDTH=101&HEIGHT=101&BBOX=-11520273.173679635%2C2337414.386499927%2C-11495137.607241083%2C2362549.952938478';
    // viewparams = ['20200716', '20200715', '20200714'];
    dataAll = [];


    // filtrado del formGroup
    // viewParams = [];
    viewParams = '';
    vpStartDate = '';
    vpEndDate = '';
    vpStartTimeZone = '';
    vpEndTimeZone = '';
    vpTowns = '';
    vpSubcategory = '';
    vpWounds = '';
    vpAutoTypes = '';
    vpGenders = '';
    vpWeekDays = '';

    mySub = new Subscription();
    // grafica line ng2


    // public lineChartData: ChartDataSets[] = [
    //     { data: [], label: 'Peat??n' },
    //     { data: [], label: 'Motociclista' },
    //     { data: [], label: 'Ciclista' },
    //     { data: [], label: 'Conductor de otro vehiculo' },
    //     { data: [], label: 'Pasajero de otro vehiculo' }
    // ];

    // public lineChartLabels: Label[] = ['14 d??as atr??s', '7 d??as atr??s', 'Hoy'];
    // public lineChartOptions: (ChartOptions & { annotation: any }) = {
    //     responsive: true,
    //     scales: {
    //         // We use this empty structure as a placeholder for dynamic theming.
    //         xAxes: [{
    //             ticks: {
    //                 fontColor: 'green',
    //             }
    //         }],
    //         yAxes: [{
    //             ticks: {
    //                 fontColor: 'red',
    //                 beginAtZero: true
    //             }
    //         }]
    //         // {
    //         //   id: 'y-axis-0',
    //         //   position: 'left',
    //         // }
    //         // ,
    //         // {
    //         //   id: 'y-axis-1',
    //         //   position: 'right',
    //         //   gridLines: {
    //         //     color: 'rgba(255,0,0,0.3)',
    //         //   },
    //         //   ticks: {
    //         //     fontColor: 'red',
    //         //   }
    //         // }
    //         // ]
    //     },
    //     annotation: {
    //         annotations: [
    //             {
    //                 type: 'line',
    //                 mode: 'vertical',
    //                 scaleID: 'x-axis-0',
    //                 value: 'March',
    //                 borderColor: 'green',
    //                 borderWidth: 2,
    //                 label: {
    //                     enabled: true,
    //                     fontColor: 'orange',
    //                     content: 'LineAnno'
    //                 }
    //             },
    //         ],
    //     },
    // };

    // public lineChartColors: Color[] = [
    //     { // mujeres
    //         backgroundColor: '#cb3788c5',
    //         borderColor: '#C9388C',
    //         pointBackgroundColor: '#C9388C',
    //         pointBorderColor: '#7',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: '#C9388C'
    //     },
    //     { // hombres
    //         backgroundColor: '#10e7ff94',
    //         borderColor: '#05ADBF',
    //         pointBackgroundColor: '#05ADBF',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: '#05ADBF'
    //     },
    //     { // ne
    //         backgroundColor: '#c0c0c083',
    //         borderColor: '#c0c0c0',
    //         pointBackgroundColor: '#c0c0c0',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: '#c0c0c0'
    //     }
    // ];
    // public lineChartLegend = true;
    // public lineChartType = 'line';
    // public lineChartPlugins = [];

    // @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

    // public lineChartColors = [
    //   {
    //     backgroundColor: ['#C9388C', '#C9388C', '#C9388C'],
    //   },
    //   {
    //     backgroundColor: ['#05ADBF', '#05ADBF', '#05ADBF'],
    //   },
    //   {
    //     backgroundColor: ['#c0c0c0', '#c0c0c0', '#c0c0c0'],
    //   }
    // ];
    // grafica bar ng2

    // Pie
    sinistriesLabel: Section[] = [
        {
            name: 'Peat??n',
            sinisterColor: sinisterColors.med_sup,
            sinisterIcon: './assets/images/user_peaton.svg',
        },
        {
            name: 'Pasajero de otro veh??culo',
            sinisterColor: sinisterColors.cap_trab,
            sinisterIcon: './assets/images/user_pasajero.svg',
        }
    ];
    public doughnutChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return '';
                },
            },
        }
    };
    public doughnutChartLabels: Label[] = ['Media superior', 'Capacitaci??n del trabajo'];
    public doughnutChartData: number[] = [0, 0];
    public doughnutChartData2: number[] = [0, 0];
    public doughnutChartDataClickMap1: number[] = [0, 0];
    public doughnutChartDataClickMap2: number[] = [0, 0];
    public doughnutChartType: ChartType = 'doughnut';
    public doughnutChartLegend = true;
    public doughnutChartPlugins = [];
    public doughnutChartColors = [
        {
            backgroundColor: [
                sinisterColors.med_sup,
                sinisterColors.cap_trab, ]
        },
    ];
    // pie

    mensaje = 'Navbar!';
    myData: string;

    pos = 0;
    exit;

    calendarView = CalendarView;
    dayStartHour = 0;
    dayEndHour = 8;
    // events: CalendarEvent[] = [];
    locale = 'en';
    viewDate = new Date();
    view: CalendarView = CalendarView.Week;
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

    events: CalendarEvent[] = [
        {
            start: new Date('Dec 14 2020 00:00:00'),
            end: new Date('Dec 14 2020 02:00:00'),
            title: '',
            color: colors.blue2,
        },
        {
            start: new Date('Dec 14 2020 02:00:00'),
            end: new Date('Dec 14 2020 04:00:00'),
            title: '',
            color: colors.blue1,
        },
        {
            start: new Date('Dec 14 2020 04:00:00'),
            end: new Date('Dec 14 2020 06:00:00'),
            title: '',
            color: colors.yellow,
        },
        {
            start: new Date('Dec 14 2020 06:00:00'),
            end: new Date('Dec 14 2020 08:00:00'),
            title: '',
            color: colors.blue1,
        },
        {
            start: new Date('Dec 15 2020 00:00:00'),
            end: new Date('Dec 15 2020 02:00:00'),
            title: '',
            color: colors.blue1,
        },
        {
            start: new Date('Dec 15 2020 02:00:00'),
            end: new Date('Dec 15 2020 04:00:00'),
            title: '',
            color: colors.blue2,
        },
        {
            start: new Date('Dec 15 2020 04:00:00'),
            end: new Date('Dec 15 2020 06:00:00'),
            title: '',
            color: colors.yellow,
        },
        {
            start: new Date('Dec 15 2020 06:00:00'),
            end: new Date('Dec 15 2020 08:00:00'),
            title: '',
            color: colors.blue2,
        }
    ];

    // setView(view: CalendarView) {
    //   this.view = view;
    // }

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

        // console.log('event.target.value');
        // console.log(event.target.value);


        // this.eventDatePicker = (event.target.value.getFullYear().toString() + ', ' +
        // (event.target.value.getMonth() + 1).toString() + ', ' + event.target.value.getDate().toString())
        // this.routerUrl = this._router.url.split('/2')[0]
        // this.routerUrlCheck = this.eventDatePicker+'-'+this._router.url.split('-')[1]
        // console.log(this.routerUrl, this.routerUrlCheck + this.casos);
        // this._router.navigate([this.routerUrl, this.routerUrlCheck + this.casos]);
        // this._router.navigate([this.routerUrl, this.routerUrlCheck]);
    }
    addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {

        // console.log('event.target.value');
        // console.log(event.target.value);
    }
    addEvent3(type: string, event: MatDatepickerInputEvent<Date>) {

        // console.log('event.target.value');
        // console.log(event.target.value);
    }
    addEvent4(type: string, event: MatDatepickerInputEvent<Date>) {

        // console.log('event.target.value');
        // console.log(event.target.value);
    }

    openBottomSheet(): void {
        this.pos = 0;
        this.viewParams = '';
        console.log('openBottomSheet()');
        // this._router.events.subscribe((e: any) => {

        //     console.log('e:', e);


        //     // if (event instanceof NavigationStart) {
        //     // }

        // });


        this._bottomSheet.open(BottonSheetExampleComponent)
            .afterDismissed().subscribe((dataFilter) => {
                // this._dateService.getSinisterTown().subscribe(data => {
                //     console.log('data despues de filtrar');
                //     console.log(data.features);
                //     this.listarPaises = data.features;

                // });

                console.log('this._bottomSheet.open.afterDismissed()', dataFilter);


                // if (moment.duration(dataFilter.endDate - dataFilter.startDate).asYears() < 3) {
                //     this.minDateSelect = false;
                // }

                Object.values(dataFilter).forEach(value => {
                    if (value) {
                        switch (Object.getOwnPropertyNames(dataFilter)[this.pos]) {
                            case Object.getOwnPropertyNames(dataFilter)[0]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[0] + ':' + value + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[1]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[1] + ':' + value + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[2]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[2] + ':' + value + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[3]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[3] + ':' + value + ';';
                                break;
                            }
                            case Object.getOwnPropertyNames(dataFilter)[4]: {
                                this.viewParams += Object.getOwnPropertyNames(dataFilter)[4] + ':' + value + ';';
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }
                    this.pos++;
                });

                console.log('---- this.viewParams');
                console.log(this.viewParams);

                // this.vpGenders = 'genders:Mas;';
                // this.viewParams += this.vpGenders;

                this.getMedSup(this.viewParams);


                // this.getSinisterIntersections(this.viewParams);
                // this.getSinisterSinistries(this.viewParams);
                // this.getSinisterWounds(this.viewParams);

                this.dataFilterDashMap = this.viewParams;
                // this.dataFilterDash = this.viewParams;
                // // console.log('result');
                // // console.log(result);
                // // console.log('Bottom sheet has been dismissed.');
                // if (dataFilter.towns) {
                //     this.municipio = dataFilter.towns;
                // } else {
                //     this.municipio = '';
                // }

            });
    }

    radioChange(event: MatRadioChange) {
        // console.log(event);
        // console.log(event.value);
        // console.log(event.source.id);
        // this.radioButton = event.source.id;
        // console.log(this.radioButton);
        // var casos;
        switch (event.source.id) {
            case 'mat-radio-3': {
                // console.log('tasa');
                this.radioButton = 'tasa';
                break;
            }
            default: {
                // console.log('Default - case mat-radio-3');
                this.radioButton = 'total';
                break;
            }
        }
        // this.routerUrlCheck[0]casos
        // console.log(this.routerUrl +  this.routerUrlCheck + this.casos);

        // this._router.navigate([this.routerUrl, this.routerUrlCheck + this.casos]);

        // this.filter['property'] = this.selected;
        // console.log(this.filter);
    }

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _requestService: RequestService,
        private _dateService: DateService,
        private miDatePipe: DatePipe,
        private _bottomSheet: MatBottomSheet,
        private _spinnerService: SpinnerService,
        private _snackBar: MatSnackBar) {

        this.data = 'sidebar';
        this.formulario = new FormGroup({
            nombre: new FormControl(),
            apellido: new FormControl(),
            empresa: new FormControl(),
            telefono: new FormControl(),
            email: new FormControl(),
        });

        this.formGroupFilter = new FormGroup({
            filter: new FormControl('', Validators.required),
            filterString: new FormControl('', Validators.required)
        });

        this._router.navigate(['/med-sup']);
        // this.openBottomSheet();

        // saca el total de intersections - cruces
        // this.getSinisterIntersections(this.viewParams);

        // saca el total de siniestros - sinistries
        // this.getSinisterSinistries(this.viewParams);


        // saca el total de intersections - cruces
        // this.getSinisterWounds(this.viewParams);


        // this._dateService.getSinisterWounds(this.viewParams).subscribe(data => {
        //     console.log('data getSinisterWounds');
        //     console.log(data.features[0].properties.wounds);
        //     this.wounds  = data.features[0].properties.wounds;
        // });



        // this._bottomSheet.open(BottonSheetExampleComponent)
        //     .afterDismissed().subscribe((result) => {
        //     console.log(result);
        //     console.log('Bottom sheet has been dismissed.');
        //     this.municipio = result;
        // });
        // MatBottomSheetRef.afterDismissed().subscribe(result => {
        //     console.log('bottomsheet was closed');
        //     console.log(result); //Deleted
        // });
        // this.service.getSubsectors().subscribe(data => {
        // this.minValue = this.formGroup.value.sliderControl[0]
        // this.maxValue = this.formGroup.value.sliderControl[1]
        // data.features.forEach(feature => {
        //   feature.properties['isDisable'] = true
        //   if(feature.properties.iceValue >= this.formGroup.value.sliderControl[0] &&
        // feature.properties.iceValue <= this.formGroup.value.sliderControl[1]){
        //     feature.properties['isDisable'] = false
        //   }
        //   this.listSubsectors.push(feature.properties)

        // })
        // this.formGroup.patchValue({
        //   mun: "311",
        //   workers: "all"
        // })
        // this.onSubmit()
        //   })

        //   this.formGroup.controls['sliderControl'].valueChanges.subscribe(value => {
        //     this.minValue = value[0]
        //     this.maxValue = value[1]
        // this.updateSubsectorSelect()
        //   })
        // }

        // this._route.params.forEach(params => {
        //     console.log('constructor-params.link', params.link);


        // });
        // this._route.params.forEach(params => {

        //     // console.log(this._router.url);
        //     this.favoriteSeason = 'Total';

        //     this.layerNow = this._router.url.split('-')[1];

        //     this.cvegeo = this._requestService.getCvegeo();

        //     const date_now = new Date(params.date.split('-')[0]);
        //     const date_now7 = new Date(params.date.split('-')[0]);
        //     const date_now14 = new Date(params.date.split('-')[0]);

        //     date_now7.setDate(date_now.getDate() - 7);
        //     date_now14.setDate(date_now.getDate() - 14);

        //     this.date_covid   = formatDate(date_now, 'yyyyMMdd', 'en-US');
        //     this.date_covid7  = formatDate(date_now7, 'yyyyMMdd', 'en-US');
        //     this.date_covid14 = formatDate(date_now14, 'yyyyMMdd', 'en-US');

        //     // console.log(layer);
        //     switch (this.layerNow) {
        //         case 'act': {
        //             const layer = 'activosxmpiograf';
        //             // this.getAllAcumNac(this.date_covid, this.date_covid7, this.date_covid14, this.cvegeo)
        //             this.getAllAcumNac(layer, this.date_covid, this.date_covid7, this.date_covid14, this.cvegeo);
        //             console.log('act');

        //             break;
        //         }
        //         case 'acu': {
        //             const layer = 'positivosacumxmpio';
        //             this.getAllAcumNac(layer, this.date_covid, this.date_covid7, this.date_covid14, this.cvegeo);
        //             console.log('acu');

        //             break;
        //         }
        //         case 'def': {
        //             const layer = 'defuncionesxmpio';
        //             this.getAllAcumNac(layer, this.date_covid, this.date_covid7, this.date_covid14, this.cvegeo);
        //             console.log('def');

        //             break;
        //         }
        //         case 'nac': {
        //             const layer = 'activosxmpiograf_nac';
        //             this.getAllAcumNac(layer, this.date_covid, this.date_covid7, this.date_covid14, this.cvegeo);
        //             console.log('nac');

        //             break;
        //         }
        //         default: {
        //             // console.log('Default');

        //             break;
        //         }
        //     }
        // });



    }

    ngOnInit(): void {
        const viewParams = '';
        this.getMedSup(viewParams);


        this._route.params.forEach(params => {
            // console.log('ngOnInit-params.link', params.link);


            this.dataFilterDashMap = params.link;
            // console.log('this.dataFilterDash', this.dataFilterDash);

            // switch (this.dataFilterDash) {
            //     case 'p01':
            //         this.questionSelected = this.questions[0];
            //         break;
            //     case 'p02':
            //         this.questionSelected = this.questions[1];
            //         break;
            //     default:
            //         break;
            // }

            // this.getResponseQuestions(this.dataFilterDash);


            // const dataRequest = [];
            // dataRequest.push(this.dataFilterDash);
            // dataRequest.push(this.dataFilterDash - 10);
            // dataRequest.push(this.dataFilterDash - 10);


        });

        // this._spinnerService.llamarSpinner();
        // this._dateService.getPeople().subscribe(
        //     res => {
        //         console.log("res");
        //         console.log(res);

        //     },
        //     err => {
        //          console.log("err");
        //          console.log(err);

        //     }
        // )
    }

    onSubmit() {

        if (this.formGroupFilter.invalid) {
            console.log(false);
            this._snackBar.open('Los campos no pueden estar vacios', '', {
                duration: 1500
            });

            return;
        }

        console.log(this.formGroupFilter.valid);
        console.log(this.formGroupFilter.controls.filter.value);
        console.log(this.formGroupFilter.controls.filterString.value);

        console.log('onSubmit');

        const params = `${this.formGroupFilter.controls.filter.value}:${this.formGroupFilter.controls.filterString.value.toUpperCase()};`;

        console.log(params);


        this.getMedSup(params);

        this.dataFilterDashMap = params;

        console.log(this.formGroupFilter.value);

        // this._requestService.setDataService(this.formulario.value);
    }

    getResponseQuestions(viewParams) {
        console.log('viewParams');
        console.log(viewParams);
    }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        // console.log(event, active);
    }

    public randomize(): void {
        // Only Change 3 values
        this.barChartData[0].data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
    }

    getSinisterSinistries(viewParams) {
        // console.log('viewParams');
        // console.log(viewParams);

        this._dateService.getSinisterSinistries(viewParams).subscribe(data => {
            // console.log(data.features[0].properties.sinistries);
            this.sinistries = data.features[0].properties.sinistries;
        });
    }

    getSinisterWounds(viewParams) {
        this._dateService.getSinisterWounds(viewParams).subscribe(data => {
            this.involved = data.features[0].properties.wounds;
            this.fatalities = data.features[0].properties.muertos;
            this.wounds = data.features[0].properties.heridos;
        });
    }


    // trae los datos del dashboard
    getMedSup(viewParams) {

        this._dateService.getCapTrab(`layer:cap_trab;${viewParams}`).subscribe(data => {

            const { totescuelas,
                totestudiantes,
                tothombres,
                totmujeres } = data.features[0].properties;


            if (totescuelas === 0) {

                this.totEscuelasCapTrab = 0;
                this.totEstudiantesCapTrab = 0;
                this.totHombresCapTrab = 0;
                this.totMujeresCapTrab = 0;

                this.doughnutChartData2 = [0, 0];
            } else {
                this.totEscuelasCapTrab = totescuelas;
                this.totEstudiantesCapTrab = totestudiantes;
                this.totHombresCapTrab = tothombres;
                this.totMujeresCapTrab = totmujeres;

                this.doughnutChartData2 = [this.totMujeresCapTrab, this.totHombresCapTrab];
            }

        });

        this._dateService.getMedSup(viewParams).subscribe(data => {

            const { totescuelas,
                totestudiantes,
                tothombres,
                totmujeres } = data.features[0].properties;


            if (totescuelas === 0) {

                this.totEscuelasMedSup = 0;
                this.totEstudiantesMedSup = 0;
                this.totHombresMedSup = 0;
                this.totMujeresMedSup = 0;

                this.doughnutChartData = [0, 0];
            } else {

                this.totEscuelasMedSup = totescuelas;
                this.totEstudiantesMedSup = totestudiantes;
                this.totHombresMedSup = tothombres;
                this.totMujeresMedSup = totmujeres;

                this.doughnutChartData = [this.totMujeresMedSup, this.totHombresMedSup];
            }


        });
    }
    getSinisterIntersections(viewParams) {
        this._dateService.getSinisterIntersections(viewParams).subscribe(data => {
            // console.log(data.features[0].properties.intersections);
            this.intersections = data.features[0].properties.intersections;
        });
    }

    getAllActives(date_covid, date_covid7, date_covid14, cvegeo) {

        this._requestService.getActives(date_covid, cvegeo).subscribe(data => {
            data.features.forEach(feature => {
                this.dataProperties = feature.properties;
                this.municipio = this.dataProperties.nombre;
                this.tot_cases_mun = feature.properties.activos;
                this._requestService.getActives7(date_covid7, cvegeo).subscribe(data => {
                    data.features.forEach(feature => {
                        this.dataProperties7 = feature.properties;
                        this._requestService.getActives14(date_covid14, cvegeo).subscribe(data => {
                            data.features.forEach(feature => {
                                this.dataProperties14 = feature.properties;
                                this.loadPieChart(this.dataProperties);
                                this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                            });
                        });
                    });
                });
            });
        });
    }

    getAllAcum(layer, date_covid, date_covid7, date_covid14, cvegeo) {

        this._requestService.getAcumMun_7_14(layer, date_covid, cvegeo).subscribe(data => {
            data.features.forEach(feature => {
                this.dataProperties = feature.properties;
                this.municipio = this.dataProperties.nombre;
                this.tot_cases_mun = feature.properties.activos;
                this._requestService.getAcumMun_7_14(layer, date_covid7, cvegeo).subscribe(data => {
                    data.features.forEach(feature => {
                        this.dataProperties7 = feature.properties;
                        this._requestService.getAcumMun_7_14(layer, date_covid14, cvegeo).subscribe(data => {
                            data.features.forEach(feature => {
                                this.dataProperties14 = feature.properties;
                                this.loadPieChart(this.dataProperties);
                                this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                            });
                        });
                    });
                });
            });
        });
    }
    getAllAcumNac(layer, date_covid, date_covid7, date_covid14, cvegeo) {

        date_covid = 'aaaammdd:' + date_covid;

        this._requestService.getActivesMun(layer, date_covid, cvegeo).subscribe(data => {
            if (data.numberReturned === 0) {
                this.municipio = 'SELECCIONE UN MUNICIPIO';
                this.tot_cases_mun = '0';
                this.doughnutChartData = [];
                this.lineChartData = [];

            } else {

                data.features.forEach(feature => {

                    this.dataProperties = feature.properties;
                    this.municipio = this.dataProperties.nombre;
                    this.tot_cases_mun = feature.properties.activos;
                    this._requestService.getActives7Mun(layer, date_covid7, cvegeo).subscribe(data => {

                        if (data.numberReturned === 0) {
                            this.dataProperties7['hombres'] = 0;
                            this.dataProperties7['mujeres'] = 0;
                            this.dataProperties7['ne'] = 0;

                            this._requestService.getActives14Mun(layer, date_covid14, cvegeo).subscribe(data => {

                                if (data.numberReturned === 0) {
                                    this.dataProperties14['hombres'] = 0;
                                    this.dataProperties14['mujeres'] = 0;
                                    this.dataProperties14['ne'] = 0;

                                    if (layer === 'activosnacional') {

                                        const layerNacPos = 'positivosacumxmpionac';
                                        this._requestService.getAcumMun_7_14(layerNacPos, date_covid, cvegeo).subscribe(data => {

                                            data.features.forEach(feature => {
                                                this.dataProperties['acumulados'] = feature.properties.activos;
                                                this.dataProperties['acumulados_h'] = feature.properties.hombres;
                                                this.dataProperties['acumulados_m'] = feature.properties.mujeres;
                                                this.dataProperties['acumulados_ne'] = feature.properties.ne;
                                                this.tot_cases_mun_acum = feature.properties.activos;

                                                this.doughnutChartData = [feature.properties.mujeres, feature.properties.hombres, feature.properties.ne];
                                                this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                                            });
                                        });

                                    } else {
                                        this.doughnutChartData = [feature.properties.mujeres, feature.properties.hombres, feature.properties.ne];
                                        this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                                    }

                                } else {

                                    data.features.forEach(feature => {
                                        this.dataProperties14 = feature.properties;
                                        if (layer === 'activosnacional') {
                                            const layer = 'positivosacumxmpionac';
                                            this._requestService.getAcumMun_7_14(layer, date_covid, cvegeo).subscribe(data => {
                                                data.features.forEach(feature => {
                                                    this.dataProperties['acumulados'] = feature.properties.activos;
                                                    this.dataProperties['acumulados_h'] = feature.properties.hombres;
                                                    this.dataProperties['acumulados_m'] = feature.properties.mujeres;
                                                    this.dataProperties['acumulados_ne'] = feature.properties.ne;
                                                    this.tot_cases_mun_acum = feature.properties.activos;

                                                    this.doughnutChartData = [feature.properties.mujeres, feature.properties.hombres, feature.properties.ne];
                                                    this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                                                });
                                            });

                                        } else {
                                            this.doughnutChartData = [feature.properties.mujeres, feature.properties.hombres, feature.properties.ne];
                                            this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                                        }
                                    });
                                }
                            });

                        } else {

                            data.features.forEach(feature => {
                                this.dataProperties7 = feature.properties;
                                this._requestService.getActives14Mun(layer, date_covid14, cvegeo).subscribe(data => {

                                    data.features.forEach(feature => {
                                        this.dataProperties14 = feature.properties;

                                        if (layer === 'activosxmpiograf_nac') {
                                            const layerNacPos = 'positivosacumxmpionac';
                                            this._requestService.getAcumMun_7_14_nac(layerNacPos, date_covid, cvegeo).subscribe(data => {
                                                data.features.forEach(feature => {
                                                    this.dataProperties['acumulados'] = feature.properties.activos;
                                                    this.dataProperties['acumulados_h'] = feature.properties.hombres;
                                                    this.dataProperties['acumulados_m'] = feature.properties.mujeres;
                                                    this.dataProperties['acumulados_ne'] = feature.properties.ne;
                                                    this.tot_cases_mun_acum = feature.properties.activos;

                                                    this.doughnutChartData = [feature.properties.mujeres, feature.properties.hombres, feature.properties.ne];
                                                    this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                                                });
                                            });

                                        } else {
                                            this.doughnutChartData = [feature.properties.mujeres, feature.properties.hombres, feature.properties.ne];
                                            this.loadCharts(this.dataProperties, this.dataProperties7, this.dataProperties14);
                                        }
                                    });
                                });
                            });
                        }
                    });
                });
            }
        });
    }

    getDataMap(params) {

        this.dataSchools = [];
        this.dataSchool1 = [];
        this.dataSchool2 = [];
        this.careers = [];
        this.careers1 = [];
        this.careers2 = [];

        this.dataSchoolActive = true;
        let cont = 0;

        this._dateService.getDataSchool(params.data.clave_inmueble, params.viewparams).subscribe((data: any) => {
            this.dataSchool1.push(data.features[0]);
            this.dataSchool2.push(data.features[1]);

            this.doughnutChartDataClickMap1 = [data.features[0].properties.hombres, data.features[0].properties.mujeres];
            this.hombresClickMap1 = data.features[0].properties.hombres;
            this.mujeresClickMap1 = data.features[0].properties.mujeres;
            this.alumnosTotClickMap1 = data.features[0].properties.total;

            this.alumnosTotClickMap2 = 0;

            if (data.features.length === 2) {
                this.doughnutChartDataClickMap2 = [data.features[1].properties.hombres, data.features[1].properties.mujeres];
                this.hombresClickMap2 = data.features[1].properties.hombres;
                this.mujeresClickMap2 = data.features[1].properties.mujeres;
                this.alumnosTotClickMap2 = data.features[1].properties.total;
            }

            data.features.map((data: any) => {
                this._dateService.getCareers(data.properties.clave_escuela).subscribe((data: any) => {
                    data.features.map((data: any) => {
                        if (cont === 0) {
                            this.careers1.push(data.properties.carreras);
                        }
                        if (cont === 1) {
                            this.careers2.push(data.properties.carreras);
                        }
                    });
                    cont++;
                });
            });
        });
    }

    hasCarrers() {
        this.hasCarrer = 1;
    }

    closeData() {
        this.dataSchoolActive = false;
    }

    getDataMap2(layer) {
        this.layerNow = layer;
    }

    enviarMensaje(mensajeGoku) {
        this._requestService.enviar(mensajeGoku);
    }

    verMensaje() {
        this._requestService.bulma$.pipe(take(1)).
            subscribe(mensaje => this.mensajeVegeta = mensaje);
    }

    loadPieChart(dataProperties) {
        this.doughnutChartData = [this.dataProperties.mujeres, dataProperties.hombres];
    }
    loadCharts(dataProperties, dataProperties7, dataProperties14) {

        let date_covid_graf;
        let date_covid_graf7;
        let date_covid_graf14;

        let re = /Z/gi;
        let str = dataProperties.date_now;
        date_covid_graf = str.replace(re, '');

        re = /-/gi;
        str = date_covid_graf;
        date_covid_graf = str.replace(re, ', ');

        const date = new Date(date_covid_graf);
        const date7 = new Date(date_covid_graf);
        const date14 = new Date(date_covid_graf);

        date7.setDate(date14.getDate() - 7);
        date14.setDate(date14.getDate() - 14);

        date_covid_graf = formatDate(date, 'dd-MM-yyyy', 'en-US');
        date_covid_graf7 = formatDate(date7, 'dd-MM-yyyy', 'en-US');
        date_covid_graf14 = formatDate(date14, 'dd-MM-yyyy', 'en-US');

        this.lineChartLabels = [date_covid_graf14, date_covid_graf7, date_covid_graf];

        this.doughnutChartData = [this.dataProperties.mujeres, dataProperties.hombres, dataProperties.ne];

        this.lineChartData = [
            { data: [dataProperties14.mujeres, dataProperties7.mujeres, dataProperties.mujeres], label: 'Mujeres' },
            { data: [dataProperties14.hombres, dataProperties7.hombres, dataProperties.hombres], label: 'Hombres' },
            { data: [dataProperties14.ne, dataProperties7.ne, dataProperties.ne], label: 'Ne' }
        ];
    }
}


