import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ACImageAnnotatorComponent } from './components/ac-image-annotator/ac-image-annotator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ACImageViewComponent } from './components/ac-image-view/ac-image-view.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ContainerComponent } from './components/ac-image-annotator/container/container.component';
import { ItemComponent } from './components/ac-image-annotator/container/item/item.component';
import { ConnectorDirective } from './components/ac-image-annotator/container/connector.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormImageInformationComponent } from './components/acsegmentation/form-image-information/form-image-information.component';
import { ACHeaderComponent } from './components/acheader/acheader.component'
import { ListImageComponent } from './components/acsegmentation/list-image/list-image.component'
import { ImageThumbnailComponent } from './components/acsegmentation/image-thumbnail/image-thumbnail.component';
import { ACSegmentationComponent } from './components/acsegmentation/acsegmentation.component'
import { VideoVisualisationComponent } from './components/acsegmentation/video-visualisation/video-visualisation.component';

@NgModule({
  declarations: [
    AppComponent,
    ACImageAnnotatorComponent,
    ACImageViewComponent,
    ContainerComponent,
    ItemComponent,
    ConnectorDirective,
    FormImageInformationComponent,
    ACHeaderComponent,
    ListImageComponent,
    ImageThumbnailComponent,
    ACSegmentationComponent,
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
