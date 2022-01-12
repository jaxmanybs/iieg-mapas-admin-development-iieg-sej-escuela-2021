import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    constructor() { }

    public subjectRoute = new Subject<any>();

    changeRoute(data: any) {
        this.subjectRoute.next(data);
    }
}
