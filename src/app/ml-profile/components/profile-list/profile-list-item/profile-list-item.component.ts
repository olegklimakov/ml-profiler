import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MlProfileClass } from '../../../types/ml-profile.class';
import { interval, Observable, Subscription } from 'rxjs';
import { ProfileApiService } from '../../../services/profile-api.service';
import { MlProfileStatusEnum } from '../../../types/ml-profile-status.enum';
import { DeleteProfile, RemoveSelected, UpdateProfile } from '../../../store/ml-profile.actions';
import { Select, Store } from '@ngxs/store';
import { filter, map } from 'rxjs/operators';
import { SELECT_OPTIONS } from './profile-item.const';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-list-item',
  templateUrl: './profile-list-item.component.html',
  styleUrls: ['./profile-list-item.component.scss']
})
export class ProfileListItemComponent {

  @Input() mlProfile: MlProfileClass;

  @Select(state => state.mlProfiles.selected) selectedProfile$: Observable<MlProfileClass>;
  itemStarted$: Observable<boolean> = this.selectedProfile$.pipe(
    filter(Boolean),
    map((profile: MlProfileClass) => profile.id === this.mlProfile.id)
  );

  deleteLoading = false;

  requestTimer: Subscription;
  tillTheNextRequestInSecond = null;
  selectedRequestsFrequency = 10;

  selectOptions = SELECT_OPTIONS;

  constructor(
    private profileApi: ProfileApiService,
    private store: Store,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  private startSendingRequests(): void {
    this.tillTheNextRequestInSecond = this.selectedRequestsFrequency;
    this.requestTimer = interval(1000).subscribe(() => {
      this.tillTheNextRequestInSecond -= 1; // timer tick
      this.mlProfile.runningTime += 1; // used for mock answers
      this.cd.markForCheck();
      if (this.tillTheNextRequestInSecond === 0) {
        this.requestTimer.unsubscribe();
        this.getStatus();
      }
    });
  }

  delete(): void {
    this.deleteLoading = true;
    this.profileApi.deleteTraining(this.mlProfile.id).subscribe(() => {
      this.store.dispatch(new DeleteProfile({ profile: this.mlProfile }));
    });
  }

  stopRequestsSending(): void {
    this.requestTimer?.unsubscribe();
    this.store.dispatch(new RemoveSelected());
  }

  showSuccessNotification(): void {
    // Notification on every page of SPA
    this.snackBar.open('Learning was finished', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  showFailNotification(): void {
    this.snackBar.open('Learning was failed', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getStatus(): void {
    this.store.dispatch(new UpdateProfile({ profile: this.mlProfile }));
    this.profileApi.getStatus(this.mlProfile).subscribe(res => {
      this.mlProfile.status = res;
      this.store.dispatch(new UpdateProfile({ profile: this.mlProfile }));
      if (res === MlProfileStatusEnum.Failed) {
        this.stopRequestsSending();
        this.showFailNotification();
      } else if (res === MlProfileStatusEnum.Finished) {
        this.stopRequestsSending();
        this.showSuccessNotification();
      } else {
        this.startSendingRequests();
      }
    });
  }

  changeDuration($event: number): void {
    this.selectedRequestsFrequency = $event;
    this.requestTimer.unsubscribe();
    this.startSendingRequests();
  }
}
