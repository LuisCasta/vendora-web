import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { PosPageComponent } from './modules/pos/pages/pos-page/pos-page';

export const routes: Routes = [

{
  path: '',
  component: MainLayoutComponent,
  children: [

    {
      path: 'pos',
      component: PosPageComponent
    },

    {
      path: '',
      redirectTo: 'pos',
      pathMatch: 'full'
    }

  ]
}

];