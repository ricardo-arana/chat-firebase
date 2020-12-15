import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './pages/login/login.component';
import { RoomComponent } from './pages/room/room.component';



const routes: Routes = [
    { path: 'login', component:  LoginComponent},
    { path: 'room', component: RoomComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'login'}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }