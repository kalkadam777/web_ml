import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Comment } from '../models';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})

export class CommentsComponent implements OnInit{
  comments: Comment[] = []
  constructor(private commentService:CommentService) {}

  ngOnInit(): void {
      this.getComments()
  }
  getComments() {
    this.commentService.getComments().subscribe((data) => {
      this.comments = data
    })
  }
}
