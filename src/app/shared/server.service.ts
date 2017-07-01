import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ServerService {
    constructor(private http: Http) { }
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
                const data = response.json();
                // for(const server of data) {
                //     server.name = 'FETCHED_' + server.name;
                // }
                return JSON.stringify(data);
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
}