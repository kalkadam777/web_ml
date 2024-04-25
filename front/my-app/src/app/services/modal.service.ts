import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private taskIdSource = new BehaviorSubject<number | null>(null);
  currentTaskId = this.taskIdSource.asObservable();

  changeTaskId(taskId: number) {
    this.taskIdSource.next(taskId);
  }
}
