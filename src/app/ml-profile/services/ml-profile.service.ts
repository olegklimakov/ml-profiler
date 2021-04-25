import { Injectable } from '@angular/core';
import { MlProfileClass } from '../types/ml-profile.class';
import { BehaviorSubject } from 'rxjs';

export const PROFILE_LS_KEY = 'ml-profiles';

@Injectable({
  providedIn: 'root'
})
export class MlProfileService {

  profiles$ = new BehaviorSubject<MlProfileClass[]>([]);
  startedProfile$ = new BehaviorSubject<MlProfileClass>(null);

  constructor() {
    this.initStore();
  }

  // can be modified to caching
  private initStore(): void {
    const lsProfiles = localStorage.getItem(PROFILE_LS_KEY);
    this.profiles$.next(!!lsProfiles ? JSON.parse(lsProfiles) : []);
  }

  // lil bit shitty, because we don't have method for getting profile list from server
  // used for better UX - we want to get our data when we reload our page
  private saveToLS(): void {
    localStorage.setItem(PROFILE_LS_KEY, JSON.stringify(this.profiles$.value)); // bad practice to use .value
  }

  // can simply be modified to store library usage
  addProfile(profile: MlProfileClass): void {
    this.profiles$.next(
      [
        ...this.profiles$.value, // better get store lib like ngrx / ngxs / akita, but not for PoC
        profile
      ]
    );
    this.saveToLS();
  }

  // can simply be modified to store library usage
  removeItem(item: MlProfileClass): void {
    this.profiles$.next(this.profiles$.value.filter(profile => item.id !== profile.id));
    this.saveToLS();
  }

  startProfileRequests(item: MlProfileClass) {
    this.startedProfile$.next(item);
  }
}
