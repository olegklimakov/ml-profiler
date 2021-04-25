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

  get isJustCreated(): boolean {
    return this.status === MlProfileStatusEnum.Created;
  }

  get isTrainingStarted(): boolean {
    return this.status === MlProfileStatusEnum.Started;
  }

  get isTrainingRunning(): boolean {
    return this.status === MlProfileStatusEnum.Running;
  }

  get isTrainingFinished(): boolean {
    return this.status === MlProfileStatusEnum.Finished;
  }

  get isTrainingFailed(): boolean {
    return this.status === MlProfileStatusEnum.Failed;
  }
}
