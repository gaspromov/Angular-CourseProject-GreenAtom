import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './user/events/events.component';
import { GiftsComponent } from './user/gifts/gifts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileUserComponent } from './user/profile-user/profile-user.component';
import { GiftComponent } from './user/gift/gift.component';
import { EventComponent } from './user/event/event.component';
import { AuthGuard } from './shared/services/auth/guards/auth.guard';
import { NewTasksComponent } from './worker/new-tasks/new-tasks.component';
import { MyTasksComponent } from './worker/my-tasks/my-tasks.component';
import { NewTaskComponent } from './chief/new-task/new-task.component';
import { WorkersComponent } from './chief/workers/workers.component';
import { IsWorkerGuard } from './shared/guards/is-worker.guard';
import { IsAdminGuard } from './shared/guards/is-admin.guard';


const routes: Routes = [
  { path: "events", component: EventsComponent },
  { path: 'events/:id', component: EventComponent },
  { path: "gifts", component: GiftsComponent, canActivate: [AuthGuard, IsWorkerGuard] },
  { path: 'gifts/:id', component: GiftComponent, canActivate: [AuthGuard, IsWorkerGuard] },
  { path: "profile", component: ProfileUserComponent, canActivate: [AuthGuard, IsWorkerGuard] },
  { path: "new-tasks", component: NewTasksComponent, canActivate: [AuthGuard, IsWorkerGuard] },
  { path: "my-tasks", component: MyTasksComponent, canActivate: [AuthGuard, IsWorkerGuard] },
  { path: "new-task", component: NewTaskComponent, canActivate: [AuthGuard, IsAdminGuard] },
  { path: "workers", component: WorkersComponent, canActivate: [AuthGuard, IsAdminGuard] },
  { path: "not-found", component: NotFoundComponent },
  { path: '', component: EventsComponent },
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
