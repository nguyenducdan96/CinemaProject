import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { MovieModule } from './movie/movie.module';
import { CheckoutModule } from './checkout/checkout.module';
// Service
import { MovieService } from './service/movie.service';
// Router
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, FooterComponent
  ],
  imports: [
    BrowserModule, HttpModule, RouterModule, HomeModule, appRoutes, MovieModule, CheckoutModule, Ng2PageScrollModule, FormsModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
