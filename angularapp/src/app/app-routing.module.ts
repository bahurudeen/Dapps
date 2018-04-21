import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { OrganizerComponent } from "./organizer/organizer.component";

const routes: Routes = [
  {
    path: "",
    component: RegisterComponent
  },
  {
    path: "organizer",
    component: OrganizerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
