import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'milesPipe'
})

export class MilesPipe implements PipeTransform {

    public transform(value: any) {
        // console.log('milesPipe', value);

        // return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
