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
    return timer(1000).pipe(map(() => {
      console.log('MOCK DATA', data);
      if (data.runningTime <= 15) {
        return MlProfileStatusEnum.Started;
      } else if (data.runningTime <= 25) {
        return MlProfileStatusEnum.Running;
      } else if (data.runningTime <= 35) {
        return MlProfileStatusEnum.Finished;
      }
    }));
  }
}
