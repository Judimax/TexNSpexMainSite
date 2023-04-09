import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ENV } from '@env/environment';

const routes: Routes = [

  {
    path:"",
    loadChildren: () => import("./layouts/default/default.module").then(m=>m.DefaultModule),
  },
  {
    path: 'site-offline',
    loadComponent: () => import("./core/site-offline/site-offline.component").then(m =>m.SiteOfflineComponent)
  },
  {
    path: '**',
    loadComponent: () => import("./core/not-found/not-found.component").then(m =>m.NotFoundComponent)
  },
];

if(ENV.type === "dev"){
  let scratchpadRoute =   {
    path: 'scratchpad',
    loadComponent: () => import("./pages/scratchpad/scratchpad.component").then(m =>m.ScratchpadComponent)
  }
  routes.splice(1, 0, scratchpadRoute);
}


@NgModule({
  imports: [RouterModule.forRoot(
    routes,


  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
