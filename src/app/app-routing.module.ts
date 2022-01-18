import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CheckoutComponent },
  { path: '**', component: DashboardComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
