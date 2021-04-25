import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProfileApiService } from '../../services/profile-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MlProfileClass } from '../../types/ml-profile.class';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent {

  profileControl  = new FormControl();
  sub: Subscription;
  loading = false;

  @Output() profileCreated = new EventEmitter<MlProfileClass>();

  constructor(
    private profileApiService: ProfileApiService,
    private snackBar: MatSnackBar
  ) { }

  create(): void {
    this.loading = true;
    const value = this.profileControl.value;
    this.sub = this.profileApiService.createMLProfile(this.profileControl.value).subscribe(id => {
      this.afterCreateHandling(value, id);
    });
  }

  cancel(): void {
    this.sub.unsubscribe();
    this.loading = false;
  }

  private afterCreateHandling(value: string, id: string): void {
    this.loading = false;
    this.profileControl.patchValue('');
    this.profileCreated.emit(new MlProfileClass(value, id));
    this.showUserNotification();
  }

  private showUserNotification(): void {
    this.snackBar.open('Profile was created', 'Close', {
      duration: 2000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
