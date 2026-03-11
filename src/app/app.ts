import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Chat } from './components/chat/chat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('tips-minder');
  protected chatOpened = signal<boolean>(false);

  toggleChat(event: MouseEvent) {
    event.stopPropagation();
    this.chatOpened.update((v) => !v);
  }
}
