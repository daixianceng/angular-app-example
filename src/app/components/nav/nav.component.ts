import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  private shouldEmit = false;

  @Output() navigate: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router
  ) {
    router.events
      .filter(() => this.shouldEmit)
      .filter((event) => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        this.navigate.emit(event);
        this.shouldEmit = false;
      });
  }

  onLinkClick(): void {
    this.shouldEmit = true;
  }
}
