import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

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
        return this.http.get('http://lowcost-env.nc9myxcv3i.us-west-2.elasticbeanstalk.com/services/patientservice/patients/123');
    }
}