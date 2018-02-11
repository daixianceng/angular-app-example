import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Output() routerClick: EventEmitter<any> = new EventEmitter();

  onRouterClick(): void {
    this.routerClick.emit();
  }
}
