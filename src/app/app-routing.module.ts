import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';

import { LoginFinalComponent } from './pages/login-final/login-final.component';


const routes: VexRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      // { path: 'dashboard', component: DashboardComponent }
    ],
  },
  { path: 'login', component: LoginFinalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {

    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
