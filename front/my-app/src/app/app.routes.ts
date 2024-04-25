import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PageUnavailableComponent } from './page-unavailable/page-unavailable.component';
import { TaskComponent } from './task/task.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CommentsComponent } from './comments/comments.component';
import { SolutionComponent } from './solution/solution.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, title: 'Home'},
    {path: 'about', component: AboutComponent, title: 'About'},
    {path: 'tasks', component: TaskComponent, title: 'Tasks'},
    {path: 'statistics', component: StatisticsComponent, title: 'statistics'},
    {path: 'comments', component: CommentsComponent, title: 'Comments'},
    {path: 'solution/:taskId', component: SolutionComponent, title: 'Solution'},
    {path: 'signup', component: SignUpComponent, title: 'Sign Up'},
    {path: '**', component: PageUnavailableComponent, title: '404 Not Found'},
];
