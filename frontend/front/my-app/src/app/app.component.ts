import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageUnavailableComponent } from './page-unavailable/page-unavailable.component';
import { TaskService } from './services/task.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TaskComponent } from './task/task.component';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HomeComponent, CommonModule, FooterComponent, AboutComponent, SignUpComponent, PageUnavailableComponent, TaskComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  // @ViewChild(SignInComponent) signInComponent!: SignInComponent;
  title = 'MLforces';
  logged: boolean = false;
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor( private taskService: TaskService, private router: Router, private navigationService: NavigationService) {}

  ngOnInit() {
    const access = localStorage.getItem('access');
    if (access) {
      this.logged = true;
    }
    const storedMenuItem = localStorage.getItem('activeMenuItem');
    if (storedMenuItem) {
      this.navigationService.activeMenuItem = storedMenuItem;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // activeMenuItem: string = 'home';
  // setActive(menuItem:string) {
  //   this.activeMenuItem = menuItem;
  //   if (menuItem === 'textbook') {
  //     this.goToUrl();
  //   }
  // }
  get activeMenuItem(): string {
    return this.navigationService.activeMenuItem;
  }

  setActive(menuItem: string) {
    this.navigationService.activeMenuItem = menuItem;
    localStorage.setItem('activeMenuItem', menuItem);
    if (menuItem === 'textbook') {
      this.goToUrl();
    }
  }

  goToUrl(): void {
    window.location.href = 'https://fedmug.github.io/kbtu-ml-book/intro/intro_to_ML.html';
  }

  // logout() {
  //   this.signInComponent.logout();
  // }

  logout() {
    this.logged = false;
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.clear();
    // this.router.navigate(['/login']);
  }

  login(){
    this.taskService
      .login(this.username, this.password)
      .subscribe((data) => {
        // console.log(data)
        this.logged = true;
        localStorage.setItem("access", data.access)
        localStorage.setItem("refresh", data.refresh)
        this.router.navigate(['/home']);
      });
  }
  // navigateToLogin() {
  //   this.router.navigate(['/login']);
  // }

  // navigateToSignUp() {
  //   this.router.navigate(['/signup']); 
  // }
}
