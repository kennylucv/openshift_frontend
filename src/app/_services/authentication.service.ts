import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Body } from '@angular/http/src/body';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    
    login(username: string, password: string) {
        
        let headers = new Headers({ 
            'Content-Type'  : 'application/json',
            'Accept'        : 'application/json',
        });

        let options = new RequestOptions({ headers: headers });
        let baseURL = environment.apiURL;

        return this.http.post(baseURL + '/backend/api/validate',
            JSON.stringify({ username: username, password: password }),
            options
        )
            .map((response: Response) => {
                if (response.status === 204) {
                    localStorage.setItem('currentUser', JSON.stringify(username));
                }
                else{
                    Error('Username or password is not matching')
                }
                return response.json();
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}