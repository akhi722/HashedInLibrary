import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout/checkout.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CheckoutComponent,
    CourseDetailsComponent,
    WishlistComponent,
    UserProfileComponent,
    
  ],
  imports: [
    FormsModule,
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
 
})
export class AppModule { }
