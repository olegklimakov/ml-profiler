import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MlProfileClass } from '../../types/ml-profile.class';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileListComponent {

  @Select(state => state.mlProfiles.list) profiles$: Observable<MlProfileClass[]>;
  constructor() {}

  trackById(index, item){
    return item.id;
  }
}
