import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routing: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'movie', component: MovieComponent },
    { path: 'checkout', component: CheckoutComponent }
];

export const appRoutes = RouterModule.forRoot(routing);
