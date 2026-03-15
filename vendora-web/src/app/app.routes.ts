import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { PosPageComponent } from './modules/pos/pages/pos-page/pos-page';
import { DashboardPageComponent } from './modules/pos/pages/dashboard/dashboard-page';
import { CortePageComponent } from './modules/pos/pages/court/court';


export const routes: Routes = [

{
  path: '',
  component: MainLayoutComponent,
  children: [

    {
      path: 'dashboard',
      component: DashboardPageComponent
    },

    {
      path: 'pos',
      component: PosPageComponent
    },
    {
      path: 'court',
      component: CortePageComponent
    },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    }

  ]
}

];