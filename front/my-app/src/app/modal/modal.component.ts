import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  isOpen = false;
  
  isOptionOneSelected: boolean = false;
  isOptionTwoSelected: boolean = false;

  // Метод для переключения состояния опций
  toggleOption(optionNumber: number) {
    if (optionNumber === 1) {
      this.isOptionOneSelected = !this.isOptionOneSelected;
    } else if (optionNumber === 2) {
      this.isOptionTwoSelected = !this.isOptionTwoSelected;
    }
  }
  
  @Output() toggleDeleteUpdateEvent = new EventEmitter<void>();
  @Output() showTaskListEvent = new EventEmitter<void>();
  @Output() closeModalEvent = new EventEmitter<void>();

  toggle() {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.closeModalEvent.emit();
    }
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggleDeleteUpdate() {
    this.toggleDeleteUpdateEvent.emit();
    this.close();
  }

  showTaskList() {
    this.showTaskListEvent.emit();
    this.close();
  }
}
