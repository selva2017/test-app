import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { InventoryService } from './inventory.service';
import { Product } from './product.model';

@Injectable()
export class ServerService {

    itemsChanged = new Subject<Product[]>();
    private products: Product[] = [
        new Product(1, 'tester')
    ];

    constructor(private http: Http, private inventoryService: InventoryService) { }
    storeServers(servers: any[]) {
        // const headers = new Headers({'Content-Type': 'application.json'});
        // return this.http.post('https://ng-test-app-5ccbf.firebaseio.com/data.json', servers, 
        // {headers: headers});
        const headers = new Headers({ 'Content-Type': 'application.json' });
        return this.http.put('https://ng-test-app-5ccbf.firebaseio.com/data.json', servers,
            { headers: headers });
    }

    getServers() {
        // return this.http.get('https://inventory-c9df5.firebaseio.com/Santhosh.json')      
        // return this.http.get('http://lowcost-env.nc9myxcv3i.us-west-2.elasticbeanstalk.com/services/patientservice/patients/123')
        return this.http.get('http://localhost:8080/restws/services/patientservice/patients/123')
            .map(
            (response: Response) => {
                const data = response.json();
                // for(const server of data) {
                //     server.name = 'FETCHED_';
                // }
                return JSON.stringify(data);
                // the folowing also works
                // return data.id + data.name; 
                // return data.id or data.name; 
            }
            );
        // .catch(
        // (error: Response) => {
        //     return Observable.throw('Something went wrong');
        // }
        // );

    }

    getTestName() {
        return this.http.get('https://ng-test-app-5ccbf.firebaseio.com/appName.json')
            .map(
            (response: Response) => {
                return response.json();
            }
            );
    }

    getWSData() {
        return this.http.get('http://lowcost-env.nc9myxcv3i.us-west-2.elasticbeanstalk.com/services/patientservice/patients')
        // return this.http.get('http://localhost:8080/restws/services/patientservice/patients')
            .map(
            (response: Response) => {
                const data = response.json();
                // console.log(Product);
                // this.setItem(product);
                return data;
            }
            );
    }

    postWSData(servers: any) {
        const headers = new Headers({ 'Accept-Type': 'application/json' });
        return this.http.put('http://lowcost-env.nc9myxcv3i.us-west-2.elasticbeanstalk.com/services/patientservice/patients'
            // return this.http.post('http://localhost:8080/restws/services/patientservice/patients/'
            , servers,
            { headers: headers })
        .subscribe(
        data => console.log("success!", data),
        error => console.error("couldn't post because", error)
        );
        //  this.http.post('http://lowcost-env.nc9myxcv3i.us-west-2.elasticbeanstalk.com/services/patientservice/patients', JSON.stringify('{"id":"100","name":"Dine"}'), {headers: headers});
    }

    setItem(product: Product[]) {
        // console.log(this.products);
        this.products = product;
        this.itemsChanged.next(this.products.slice());
    }

}