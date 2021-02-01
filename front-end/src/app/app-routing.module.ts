import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACSegmentationComponent } from './components/acsegmentation/acsegmentation.component';

const routes: Routes = [{
	path: 'segmentation/:id', component: ACSegmentationComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
