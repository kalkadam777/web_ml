import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _activeMenuItem: string = 'home';

  get activeMenuItem(): string {
    return this._activeMenuItem;
  }

  set activeMenuItem(menuItem: string) {
    this._activeMenuItem = menuItem;
  }
}
