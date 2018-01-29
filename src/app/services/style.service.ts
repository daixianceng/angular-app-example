import { Injectable, Inject, Optional } from '@angular/core';

import { STYLE_HOST } from 'app/common';

@Injectable()
export class StyleService {

  private stylesMap: Map<any, Node> = new Map();

  constructor(
    @Optional() @Inject(STYLE_HOST) private host: Node
  ) {
    if (host === null) {
      this.host = document.head;
    }
  }

  createStyleNode(content: string): Node {
    const styleEl = document.createElement('style');
    styleEl.textContent = content;
    return styleEl;
  }

  hasStyle(key: any): boolean {
    return this.stylesMap.has(key);
  }

  addStyle(key: any, style: string): void {
    if (this.hasStyle(key)) {
      throw new Error('The style key has already been exists.');
    }
    const styleEl = this.createStyleNode(style);
    this.stylesMap.set(key, styleEl);
    this.host.appendChild(styleEl);
  }

  removeStyle(key: any): void {
    const styleEl = this.stylesMap.get(key);
    if (styleEl) {
      this.stylesMap.delete(key);
      this.host.removeChild(styleEl);
    }
  }
}
