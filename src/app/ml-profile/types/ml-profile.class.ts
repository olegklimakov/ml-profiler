import { MlProfileStatusEnum } from './ml-profile-status.enum';

export class MlProfileClass {
  title: string;
  id: string;
  status = MlProfileStatusEnum.Created;
  runningTime = 0;

  constructor(text: string, id: string) {
    this.id = id;
    this.title = text.substr(0, 50);
  }
}

