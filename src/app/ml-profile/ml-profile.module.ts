import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { ProfileRootComponent } from './components/profile-root/profile-root.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileListItemComponent } from './components/profile-list/profile-list-item/profile-list-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProfileApiService } from './services/profile-api.service';
import { ProfileMockApiService } from './services/profile-mock-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { ProfileStatusComponent } from './components/profile-list/profile-list-item/profile-status/profile-status.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileRootComponent
  }
];

@NgModule({
  declarations: [ProfileListComponent, CreateProfileComponent, ProfileRootComponent, ProfileListItemComponent, ProfileStatusComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule
  ],
  providers: [
    {
      provide: ProfileApiService,
      useClass: environment.production ? ProfileApiService : ProfileMockApiService
    }
  ]
})
export class MlProfileModule { }
