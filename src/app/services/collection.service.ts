import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CollectionService {
    private jsonPath = 'assets/collectionInfo.json';

    constructor(private http: HttpClient) { }

    getBichos(): Observable<any[]> {
        return this.http.get<any[]>(this.jsonPath);
    }

}