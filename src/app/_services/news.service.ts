import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class NewsService {
    constructor(private http: Http) { }

    apiKey = 'a2beecddc84540a5b6f7e7da059b9b61';
    baseURL = 'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey='

    getNews() {
        return this.http.get(this.baseURL+this.apiKey).map((response: Response) => response.json());
    }

}