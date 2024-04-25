import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  logged: boolean = false;
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    const access = localStorage.getItem('access');
    if (access) {
      this.logged = true;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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

  logout() {
    this.logged = false;
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    this.router.navigate(['/login']);
  }
}
