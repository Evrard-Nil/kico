import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ActableauVideosComponent } from './components/actableau-videos/actableau-videos.component';

import { ACImageAnnotatorComponent } from './components/ac-image-annotator/ac-image-annotator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ACImageViewComponent } from './components/ac-image-view/ac-image-view.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ACSegmentationComponent } from './components/acsegmentation/acsegmentation.component';
import { ACHeaderComponent } from './components/acheader/acheader.component';
import { ImageThumbnailComponent } from './components/acsegmentation/image-thumbnail/image-thumbnail.component';
import { ListImageComponent } from './components/acsegmentation/list-image/list-image.component';
import { FormImageInformationComponent } from './components/acsegmentation/form-image-information/form-image-information.component';
import { VideoVisualisationComponent } from './components/acsegmentation/video-visualisation/video-visualisation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ActableauVideosComponent,
    ACImageAnnotatorComponent,
    ACImageViewComponent,
    ACSegmentationComponent,
    ACHeaderComponent,
    ImageThumbnailComponent,
    ListImageComponent,
    FormImageInformationComponent,
    VideoVisualisationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
