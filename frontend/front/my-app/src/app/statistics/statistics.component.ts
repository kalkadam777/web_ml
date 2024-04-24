import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RatingService } from '../services/rating.service';
import { Rating } from '../models';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  rating: Rating[] = []
  constructor(private ratingService:RatingService) {}

  ngOnInit(): void {
      this.getRating()
  }
  getRating() {
    this.ratingService.getRating().subscribe((data) => {
      this.rating = data
    })
  }
}
