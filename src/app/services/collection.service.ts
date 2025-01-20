import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CollectionService {
    private jsonPath = 'assets/collectionInfo.json';

    private collectionSubject = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) { }

    getBichos(): Observable<any[]> {
        return this.http.get<any[]>(this.jsonPath);
    }

    setCollection(collection: any) {
        this.collectionSubject.next(collection);
      }
    
      getCollection() {
        return this.collectionSubject.value;
      }
}