import { Component, Input, OnInit } from '@angular/core';
import { MlProfileClass } from '../../types/ml-profile.class';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {

  @Input() list: MlProfileClass[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
