import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

import { environment } from './../../../environments/environment';

@Injectable()
export class DateService {

    constructor(private http: HttpClient) {
    }
    // prueba de api para spinner
    baseUrl = environment.baseUrl;

    /// nosirve hasta ahorita
    private dataSubject = new Subject<any>();

    public getPeople() {
        return this.http.get(`${this.baseUrl}`);
    }

    getTown(region) {

        const layer = 'sej_getTown_api';
        let url = `https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3A${layer}&outputFormat=application%2Fjson`;

        if (region !== '') {
            url += ('&VIEWPARAMS=region:' + region);
        }

        return this.http.get<any>(url);
    }

    getNomSost(region, nomMun) {

        const layer = 'sej_getNomSost_api';

        let url = `https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3A${layer}&outputFormat=application%2Fjson`;

        if (region) {
            url += ('&VIEWPARAMS=region:' + region);
        }
        if (region && nomMun) {
            url += (';nomMun:' + nomMun);
        }
        if (!region && nomMun) {
            url += ('&VIEWPARAMS=nomMun:' + nomMun);
        }

        return this.http.get<any>(url);
    }

    getNomEscuelas(region, nomMun, nomSost) {

        const layer = 'sej_getNomEscuelas_api';

        let url = `https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3A${layer}&outputFormat=application%2Fjson&VIEWPARAMS=`;

        if (region) {
            url += (`region:${region};`);
        }
        if (nomMun) {
            url += (`nomMun:${nomMun};`);
        }
        if (nomSost) {
            url += (`nomSost:${nomSost};`);
        }

        // if (!region && nomMun) {
        //     url += (`nomSost:${nomSost}`);
        // }
        // if (!region && !nomMun && nomSost) {
        //     url += (`nomMun:${nomMun}`);
        // }


        // if (region && nomMun) {
        //     url += (`nomMun:${nomMun}`);
        // }
        // if (region && nomMun && nomSost) {
        //     url += (`nomSost:${nomSost}`);
        // }

        // if (!region && nomMun) {
        //     url += (`nomSost:${nomSost}`);
        // }
        // if (!region && !nomMun && nomSost) {
        //     url += (`nomMun:${nomMun}`);
        // }

        // if (!region && !nomMun && nomSost) {
        //     url += ('&VIEWPARAMS=nomSost:' + nomSost);
        // }

        console.log(url);

        return this.http.get<any>(url);
    }

    getCarreras(region, nomMun, nomSost, nomSchool, layer, cveProperty, cveSchool) {

        const viewparams = 'sej_getCarreras_api';

        let url = `https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3A${viewparams}&outputFormat=application%2Fjson&VIEWPARAMS=`;

        if (region) {
            url += (`region:${region};`);
        }
        if (nomMun) {
            url += (`nomMun:${nomMun};`);
        }
        if (nomSost) {
            url += (`nomSost:${nomSost};`);
        }
        if (nomSchool) {
            url += (`nomSchool:${nomSchool};`);
        }
        if (layer) {
            url += (`layer:${layer};`);
        }
        if (cveProperty) {
            url += (`cveProperty:${cveProperty};`);
        }
        if (cveSchool) {
            url += (`cveSchool:${cveSchool};`);
        }

        console.log('getCarreras()----)', url);


        return this.http.get<any>(url);
    }

    getMedSup(params) {
        // console.log(params);

        const viewparams = 'sej_med_sup_dash_api';

        let url = `https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3A${viewparams}&outputFormat=application%2Fjson`;

        url += ('&VIEWPARAMS=' + params);
        // console.log(url);


        return this.http.get<any>(url);
    }

    getCapTrab(params) {
        // console.log(params);

        const viewparams = 'sej_med_sup_dash_api';

        let url = `https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3A${viewparams}&outputFormat=application%2Fjson`;

        url += ('&VIEWPARAMS=' + params);
        // console.log(url);


        return this.http.get<any>(url);
    }

    getDataSchool(idCveProperty: string, layer: string) {

        console.log('--idCveProperty------', idCveProperty);
        console.log('--layer------', layer);


        const viewparams = 'sej_getDatosEscuela_api';
        let url = `https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3A${viewparams}&outputFormat=application%2Fjson`;
        url += (`&VIEWPARAMS=cveProperty:${idCveProperty};`);
        url += (layer);

        console.log(url);


        return this.http.get<any>(url);
    }

    getCareers(idCveSchool: string) {

        const viewparams = 'sej_getCarreras_api';
        let url = `https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3A${viewparams}&outputFormat=application%2Fjson`;
        url += ('&VIEWPARAMS=cveSchool:' + idCveSchool);

        return this.http.get<any>(url);
    }


    getSinisterTown() {
        let url = 'https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3Asinister_mun&outputFormat=application%2Fjson';
        const viewparams = 'mun';
        url += ('&VIEWPARAMS=field:' + viewparams);

        return this.http.get<any>(url);
    }

    getSinisterAutoType() {
        let url = 'https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3Asinister_mun&outputFormat=application%2Fjson';
        const viewparams = 'tipo_auto';
        url += ('&VIEWPARAMS=field:' + viewparams);
        // console.log('tipo_auto-service');
        // console.log(url);

        return this.http.get<any>(url);
    }

    getSinisterIntersections(viewParams) {
        // console.log(viewParams);

        let url = 'https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3Asinister_intersections_tot&outputFormat=application%2Fjson';
        // console.log(viewParams);
        url += ('&VIEWPARAMS=' + viewParams);

        // console.log(url);


        return this.http.get<any>(url);
    }

    getSinisterSinistries(viewParams) {
        let url = 'https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3Asinister_sinistries_tot&outputFormat=application%2Fjson';
        // console.log(viewParams);
        url += ('&VIEWPARAMS=' + viewParams);

        // console.log(url);


        return this.http.get<any>(url);
    }
    getSinisterWounds(viewParams) {
        let url = 'https://indices.jalisco.gob.mx/geoserver/iieg/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iieg%3Asinister_wounds_tot&outputFormat=application%2Fjson';
        // console.log(viewParams);
        url += ('&VIEWPARAMS=' + viewParams);

        return this.http.get<any>(url);
    }

    getDataSubject(): Observable<any> {
        // console.log("service")
        return this.dataSubject.asObservable();
    }

    clearDataSubjet() {
        this.dataSubject.next();
    }

    setDataSubject(data) {
        // console.log(data);
        this.dataSubject.next(data);
    }

}
