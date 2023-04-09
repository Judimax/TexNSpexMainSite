import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ENV } from '@env/environment';

const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
