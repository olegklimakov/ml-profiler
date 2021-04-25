import { Injectable } from '@angular/core';
import { MlProfileClass } from '../types/ml-profile.class';

export const PROFILE_LS_KEY = 'ml-profiles';

@Injectable({
  providedIn: 'root'
})
export class MlProfileService {

  profiles: MlProfileClass[] = [];

  constructor() {
    this.initStore();
  }

  // can be modified to caching
  private initStore(): void {
    const lsProfiles = localStorage.getItem(PROFILE_LS_KEY);
    this.profiles = !!lsProfiles ? JSON.parse(lsProfiles) : [];
  }

  // lil bit shitty, because we don't have method for getting profile list from server
  // used for better UX - we want to get our data when we reload our page
  private saveToLS(): void {
    localStorage.setItem(PROFILE_LS_KEY, JSON.stringify(this.profiles));
  }

  // can simply be modified to store library usage
  addProfile(profile: MlProfileClass): void {
    this.profiles.push(profile);
    this.saveToLS();
  }
}
