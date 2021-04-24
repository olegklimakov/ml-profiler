import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'ml-profile',
    pathMatch: 'full',
  },
  {
    path: 'ml-profile',
    loadChildren: () => import('./ml-profile/ml-profile.module').then(module => module.MlProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
