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
        // return this.http.get('https://ng-test-app-5ccbf.firebaseio.com/data.json');      
        return this.http.get('http://lowcost-env.nc9myxcv3i.us-west-2.elasticbeanstalk.com/services/patientservice/patients/123')
            .map(
            (response: Response) => {
                return response.arrayBuffer;
                // for(const server of data) {
                //     server.name = 'FETCHED_' + server.name;
                // }
                // return JSON.stringify(data);
            }
            )
            .catch(
            (error: Response) => {
                return Observable.throw('Something went wrong');
            }
            );

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
        return this.http.get('http://lowcost-env.nc9myxcv3i.us-west-2.elasticbeanstalk.com/services/patientservice/patients/123')
            .subscribe(
            (response: Response) => {
                const product: Product[] = response.json();
                console.log(product);
                this.setItem(product);
                return product;
            }
            );
    }
    setItem(product: Product[]) {
        // console.log(this.products);
        this.products = product;
        this.itemsChanged.next(this.products.slice());
    }

}