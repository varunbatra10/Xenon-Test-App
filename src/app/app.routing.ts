import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/AuthGuard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'pageOne', component: PageOneComponent , canActivate: [AuthGuard]},
  { path: 'pageTwo', component: PageTwoComponent , canActivate: [AuthGuard]},
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
