import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoatComponent } from './boat/boat.component';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FactorizeComponentComponent } from './factorize-component/factorize-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BoatComponent,
    MapComponent,
    HeaderComponent,
    FactorizeComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
