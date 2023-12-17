import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { VideoPointsComponent } from './pages/video-points/video-points.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'videopoints', component: VideoPointsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
