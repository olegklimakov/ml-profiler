import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 } from 'uuid';
import { MlProfileStatusEnum } from '../types/ml-profile-status.enum';
import { MlProfileClass } from '../types/ml-profile.class';

@Injectable({
  providedIn: 'root'
})
export class ProfileMockApiService {

  // TBD
  // getListOfProfiles() {}

  // TBD
  //  stopTraining(id: string): Observable<void> {}

  createMLProfile(data: string): Observable<string> {
    return timer(3000).pipe(map(() => v4()));
  }

  startTraining(id: string): Observable<void> {
    return timer(3000).pipe(map(() => {}));
  }

  deleteTraining(id: string): Observable<void> {
    return timer(3000).pipe(map(() => {}));
  }

  getStatus(data: MlProfileClass): Observable<MlProfileStatusEnum> {
    return timer(3000).pipe(map(() => {
      if (data.runningTime <= 2000) {
        return MlProfileStatusEnum.Started;
      } else if (data.runningTime <= 6000) {
        return MlProfileStatusEnum.Running;
      } else if (data.runningTime <= 10000) {
        return MlProfileStatusEnum.Finished;
      }
    }));
  }
}
