import { Action, State, StateContext } from '@ngxs/store';
import { MlProfileClass } from '../types/ml-profile.class';
import { Injectable } from '@angular/core';
import { AddProfile, DeleteProfile, RemoveSelected, UpdateProfile } from './ml-profile.actions';

interface MlProfileStateModel {
  list: MlProfileClass[];
  selected: MlProfileClass | null;
}

export const PROFILE_LS_KEY = 'ml-profiles';
const lsState = localStorage.getItem(PROFILE_LS_KEY);

@State<MlProfileStateModel>({
  name: 'mlProfiles',
  defaults: lsState ? {
    selected: null,
    list: JSON.parse(lsState)?.list || [],
  } : {
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
        profile,
        ...state.list,
      ]
    });
    const newState = ctx.getState();
    this.saveToLS(newState);
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
    const newState = ctx.getState();
    this.saveToLS(newState);
  }

  @Action(DeleteProfile)
  delete(ctx: StateContext<MlProfileStateModel>, { payload }: UpdateProfile) {
    const state = ctx.getState();
    const { profile } = payload;
    const { list } = state;
    ctx.setState({
      ...state,
      list: list.filter(item => item.id !== profile.id)
    });
    const newState = ctx.getState();
    this.saveToLS(newState);
  }

  @Action(RemoveSelected)
  deleteSelected(ctx: StateContext<MlProfileStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selected: null,
    });
    const newState = ctx.getState();
    this.saveToLS(newState);
  }

  // lil bit shitty, because we don't have method for getting profile list from server
  // used for better UX - we want to get our data when we reload our page
  private saveToLS(state: MlProfileStateModel): void {
    localStorage.setItem(PROFILE_LS_KEY, JSON.stringify(state)); // bad practice to use .value
  }
}
