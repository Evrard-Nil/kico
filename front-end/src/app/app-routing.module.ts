import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ACSegmentationComponent } from './components/acsegmentation/acsegmentation.component';

import { ACImageAnnotatorComponent } from './components/ac-image-annotator/ac-image-annotator.component';
import { ActableauVideosComponent } from './components/actableau-videos/actableau-videos.component';

const routes: Routes = [{
  path: '', component: ActableauVideosComponent
}, {
  path: 'segmentation/:id', component: ACSegmentationComponent
}, {
  path: 'annotation/:id', component: ACImageAnnotatorComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
