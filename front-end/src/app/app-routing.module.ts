import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACImageAnnotatorComponent } from './components/ac-image-annotator/ac-image-annotator.component';
import { ACSegmentationComponent } from './components/acsegmentation/acsegmentation.component';

const routes: Routes = [{
	path: 'segmentation/:id', component: ACSegmentationComponent
},
  {
    path: 'annotation/:id', component : ACImageAnnotatorComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
