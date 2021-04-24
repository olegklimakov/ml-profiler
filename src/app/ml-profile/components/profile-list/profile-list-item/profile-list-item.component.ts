import { Component, Input, OnInit } from '@angular/core';
import { MlProfileClass } from '../../../types/ml-profile.class';

@Component({
  selector: 'app-profile-list-item',
  templateUrl: './profile-list-item.component.html',
  styleUrls: ['./profile-list-item.component.scss']
})
export class ProfileListItemComponent implements OnInit {

  @Input() mlProfile: MlProfileClass;
  constructor() { }

  ngOnInit(): void {
  }

}
