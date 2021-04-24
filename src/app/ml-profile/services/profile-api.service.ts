import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { v4 } from 'uuid';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileApiService {

  constructor(
    private http: HttpClient
  ) { }

  // TBD
  // getListOfProfiles() {}

  // TBD
  //  stopTraining(id: string): Observable<void> {}

  createMLProfile(data: string): Observable<string> {
    if (environment.production) {
      return this.http.post<string>('api/', { data });
    } else {
      return timer(3000).pipe(map(() => v4()));
    }
  }

  startTraining(id: string): Observable<void> {
    return timer(3000).pipe(
      map(() => {})
    );
  }

  deleteTraining(id: string): Observable<void> {
    return timer(3000).pipe(
      map(() => {})
    );
  }


}
