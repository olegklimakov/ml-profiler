import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MlProfileClass } from '../../../types/ml-profile.class';
import { interval, Subscription } from 'rxjs';
import { ProfileApiService } from '../../../services/profile-api.service';
import { MlProfileStatusEnum } from '../../../types/ml-profile-status.enum';

@Component({
  selector: 'app-profile-list-item',
  templateUrl: './profile-list-item.component.html',
  styleUrls: ['./profile-list-item.component.scss']
})
export class ProfileListItemComponent {

  deleteLoading = false;

  requestTimer: Subscription;
  tillTheNextRequestInSecond = null;
  selectedRequestsFrequency = 10;

  selectOptions = [
    {
      title: '10s',
      value: 10,
    },
    {
      title: '30s',
      value: 30,
    },
    {
      title: '1m',
      value: 60,
    },
    {
      title: '3m',
      value: 180,
    },
    {
      title: '5m',
      value: 300,
    },
    {
      title: '10m',
      value: 600,
    }
  ];

  @Input() mlProfile: MlProfileClass;
  @Output() deleted = new EventEmitter<void>();

  constructor(
    private profileApi: ProfileApiService,
    private cd: ChangeDetectorRef
  ) { }

  start() {
    this.tillTheNextRequestInSecond = this.selectedRequestsFrequency;
    this.requestTimer = interval(1000).subscribe(res => {
      this.tillTheNextRequestInSecond -= 1;
      console.log(this.mlProfile);
      this.mlProfile.runningTime += 1;
      this.cd.markForCheck();
      if (this.tillTheNextRequestInSecond === 0) {
        this.requestTimer.unsubscribe();
        this.getStatus();
      }
    });
  }

  delete() {
    this.deleteLoading = true;
    this.profileApi.deleteTraining(this.mlProfile.id).subscribe(() => {
      console.log('here');
      this.deleted.emit();
    });
  }

  getStatus() {
    this.profileApi.getStatus(this.mlProfile).subscribe(res => {
      this.mlProfile.status = res;
      this.cd.markForCheck();
      console.log(res);
      if (res === MlProfileStatusEnum.Failed) {

      } else if (res === MlProfileStatusEnum.Finished) {

      } else {
        this.start();
      }
    });
  }

}
