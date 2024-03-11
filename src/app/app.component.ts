import {
  Component,
  ElementRef,
  HostBinding,
  inject,
  output,
  signal,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { Directive } from "@angular/core";

@Directive({
  selector: "[appHover]",
  standalone: true,
})
export class HoverDirective {
  event = output({ alias: "appHover" });

  el = inject(ElementRef).nativeElement as HTMLElement;

  ngOnInit() {
    this.el.addEventListener("mouseover", () => {
      this.event.emit();
    });
  }
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HoverDirective],
  template: `
    <div (appHover)="hovered.set(true)">
      @if (hovered()) {
        É isso aí!
      } @else {
        Passe o mouse aqui
      }

    </div>
  `,
  styles: [],
})
export class AppComponent {
  hovered = signal(false);
}
