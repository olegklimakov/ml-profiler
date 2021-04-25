import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MlProfileClass } from '../../types/ml-profile.class';
import { MlProfileService } from '../../services/ml-profile.service';
import { MlProfileState } from '../../store/ml-profile.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AddProfile, DeleteProfile } from '../../store/ml-profile.actions';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileListComponent {

  @Select(MlProfileState) profiles$: Observable<MlProfileClass[]>;

  constructor(
    private store: Store,
  ) {
  }

  onDelete(profile: MlProfileClass) {
    // this.profileService.removeItem(item);
    this.store.dispatch(new DeleteProfile({ profile }));
  }
}
