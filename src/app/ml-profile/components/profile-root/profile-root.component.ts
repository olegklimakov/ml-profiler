import { Component } from '@angular/core';
import { MlProfileClass } from '../../types/ml-profile.class';
import { Store } from '@ngxs/store';
import { AddProfile } from '../../store/ml-profile.actions';

@Component({
  selector: 'app-profile-root',
  templateUrl: './profile-root.component.html',
  styleUrls: ['./profile-root.component.scss']
})
export class ProfileRootComponent {
  constructor(
    private store: Store
  ) { }

  onProfileCreated(profile: MlProfileClass) {
    this.store.dispatch(new AddProfile({profile}));
  }
}
