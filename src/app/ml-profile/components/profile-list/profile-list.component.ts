import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MlProfileClass } from '../../types/ml-profile.class';
import { MlProfileService } from '../../services/ml-profile.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileListComponent {

  constructor(
    public profileService: MlProfileService,
  ) { }

  onDelete(item: MlProfileClass) {
    this.profileService.removeItem(item);
  }
}
