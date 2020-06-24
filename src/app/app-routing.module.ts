import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './user/events/events.component';
import { GiftsComponent } from './user/gifts/gifts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileUserComponent } from './user/profile-user/profile-user.component';
import { GiftComponent } from './user/gift/gift.component';
import { EventComponent } from './user/event/event.component';
import { AuthGuard } from './shared/services/auth/guards/auth.guard';


const routes: Routes = [
  { path: "events", component: EventsComponent },
  { path: 'events/:id', component: EventComponent },
  { path: "gifts", component: GiftsComponent },
  { path: 'gifts/:id', component: GiftComponent },
  { path: "profile", component: ProfileUserComponent, canActivate: [AuthGuard] },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
