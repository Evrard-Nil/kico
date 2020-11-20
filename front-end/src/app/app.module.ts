import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ACImageAnnotatorComponent } from './components/ac-image-annotator/ac-image-annotator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ACImageViewComponent } from './components/ac-image-view/ac-image-view.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    ACImageAnnotatorComponent,
    ACImageViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
