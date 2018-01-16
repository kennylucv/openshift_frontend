import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate
            if (connection.request.url.endsWith('/api/validate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                if (params.username === "Kenny"|| params.username === "hideBulletinNoAccounts" || params.username === "showBulletinNoAccounts" || params.username === "hideBulletinHasAccounts"  ) {//if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    //let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('Username or password is not matching'));
                }
                return;
            }

            if (connection.request.url.endsWith('/api/users/showBulletinNoAccounts') && connection.request.method === RequestMethod.Get) {
                
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: {
                        bulletin: true,
                        accounts: [
                        ]
                    }
                })));
                return;
            }

            if (connection.request.url.endsWith('/api/users/hideBulletinNoAccounts') && connection.request.method === RequestMethod.Get) {
                
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: {
                        bulletin: false,
                        accounts: [
                        ]
                    }
                })));
                return;
            }

            if (connection.request.url.endsWith('/api/users/hideBulletinHasAccounts') && connection.request.method === RequestMethod.Get) {
                
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: {
                        bulletin: false,
                        accounts: [
                            {type: "Savings", amount: 5000},
                            {type: "Chequing", amount: 10000}
                        ]
                    }
                })));
                return;
            }

            if (connection.request.url.endsWith('/api/users/Kenny') && connection.request.method === RequestMethod.Get) {
                
                connection.mockRespond(new Response(new ResponseOptions({
                    status: 200,
                    body: {
                        bulletin: true,
                        accounts: [
                            {type: "Savings", amount: 5000},
                            {type: "Chequing", amount: 10000}
                        ]
                    }
                })));
                return;
            }


            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};