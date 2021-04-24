import { Injectable } from '@angular/core';
import { MlProfileClass } from '../types/ml-profile.class';

@Injectable({
  providedIn: 'root'
})
export class MlProfileService {

  profiles: MlProfileClass[] = [];

  constructor() { }
}
