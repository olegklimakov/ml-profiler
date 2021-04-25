import { Action, State, StateContext } from '@ngxs/store';
import { MlProfileClass } from '../types/ml-profile.class';
import { Injectable } from '@angular/core';
import { AddProfile, DeleteProfile, UpdateProfile } from './ml-profile.actions';

interface MlProfileStateModel {
  list: MlProfileClass[];
  selected: MlProfileClass;
}

@State<MlProfileStateModel>({
  name: 'MLProfiles',
  defaults: {
    selected: null,
    list: []
  }
})
@Injectable()
export class MlProfileState {

  @Action(AddProfile)
  addProfile(ctx: StateContext<MlProfileStateModel>, { payload }: AddProfile) {
    const state = ctx.getState();
    const { profile } = payload;
    ctx.setState({
      ...state,
      list: [
        ...state.list,
        profile
      ]
    });
  }

  @Action(UpdateProfile)
  updateProfile(ctx: StateContext<MlProfileStateModel>, { payload }: UpdateProfile) {
    const state = ctx.getState();
    const { profile } = payload;
    const { list } = state;
    const index = state.list.findIndex((item) => item.id === profile.id);
    list[index] = profile;
    ctx.setState({
      ...state,
      selected: profile,
      list
    });
  }

  @Action(DeleteProfile)
  delete(ctx: StateContext<MlProfileStateModel>, { payload }: UpdateProfile) {
    const state = ctx.getState();
    const { profile } = payload;
    const { list } = state;
    ctx.setState({
      ...state,
      selected: profile,
      list: list.filter(item => item.id !== profile.id)
    });
  }

}
