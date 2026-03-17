import { Component, signal } from '@angular/core';
import { Chat } from "../../shared/components/chat/chat";
import { RouterOutlet } from "@angular/router";
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";

@Component({
  selector: 'app-layout',
  imports: [Chat, RouterOutlet, Header, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  protected readonly title = signal('tips-minder');
  protected chatOpened = signal<boolean>(false);

  toggleChat(event: MouseEvent) {
    event.stopPropagation();
    this.chatOpened.update((v) => !v);
  }
}
