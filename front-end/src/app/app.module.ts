import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
