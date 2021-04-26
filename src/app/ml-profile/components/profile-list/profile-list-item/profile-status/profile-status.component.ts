import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MlProfileStatusEnum } from '../../../../types/ml-profile-status.enum';

@Component({
  selector: 'app-profile-status',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileStatusComponent {

  @Input() status: MlProfileStatusEnum = MlProfileStatusEnum.Created;
}
