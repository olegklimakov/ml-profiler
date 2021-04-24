import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MlProfileClass } from '../types/ml-profile.class';
import { MlProfileStatusEnum } from '../types/ml-profile-status.enum';

@Injectable()
export class ProfileApiService {

  readonly profilePrefix = '/api/profile/';

  constructor(
    private http: HttpClient
  ) { }

  // TBD
  // getListOfProfiles() {}

  // TBD
  //  stopTraining(id: string): Observable<void> {}

  createMLProfile(data: string): Observable<string> {
    return this.http.post<string>(this.profilePrefix, { data });
  }

  startTraining(id: string): Observable<void> {
    return this.http.post<void>(`${this.profilePrefix}${id}/start`, {});
  }

  deleteTraining(id: string): Observable<void> {
    return this.http.delete<void>(`${this.profilePrefix}${id}`);
  }

  getStatus(data: MlProfileClass): Observable<MlProfileStatusEnum> {
    return this.http.get<MlProfileStatusEnum>(`${this.profilePrefix}${data.id}/status`);
  }


}
