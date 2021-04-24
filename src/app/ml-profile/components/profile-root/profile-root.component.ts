import { Component, OnInit } from '@angular/core';
import { MlProfileService } from '../../services/ml-profile.service';
import { MlProfileClass } from '../../types/ml-profile.class';

@Component({
  selector: 'app-profile-root',
  templateUrl: './profile-root.component.html',
  styleUrls: ['./profile-root.component.scss']
})
export class ProfileRootComponent {
  constructor(
    public mlProfileService: MlProfileService,
  ) { }

  onProfileCreated(item: MlProfileClass) {
    this.mlProfileService.profiles.push(item);
  }
}
