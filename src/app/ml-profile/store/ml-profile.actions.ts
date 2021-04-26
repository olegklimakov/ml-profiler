import { MlProfileClass } from '../types/ml-profile.class';

export class AddProfile {
  static readonly type = '[ML-Profile] Create';
  constructor(public payload: { profile: MlProfileClass }) {}
}

export class UpdateProfile {
  static readonly type = '[ML-Profile] Update';
  constructor(public payload: { profile: MlProfileClass }) {}
}

export class DeleteProfile {
  static readonly type = '[ML-Profile] Delete';
  constructor(public payload: { profile: MlProfileClass }) {}
}

export class RemoveSelected {
  static readonly type = '[ML-Profile] Remove Selected';
}
