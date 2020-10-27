import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ACSegmentationComponent } from './components/acsegmentation/acsegmentation.component';
import { ACHeaderComponent } from './components/acheader/acheader.component';

@NgModule({
  declarations: [
    AppComponent,
    ACSegmentationComponent,
    ACHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
