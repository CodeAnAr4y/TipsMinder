import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { retry, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chat implements OnInit {
  private socket$!: WebSocketSubject<any>;
  private destroyRef = inject(DestroyRef);

  public newMessage = '';
  public messages = signal<{ type: 'sent' | 'received'; text: string }[]>([]);
  public isConnected = signal(false);
  public chatOpened = signal(false);

  ngOnInit() {
    this.connect();
  }

  private connect() {
    this.socket$ = webSocket({
      url: environment.WS_URL,
      deserializer: (msg) => msg.data,
      openObserver: { next: () => this.isConnected.set(true) },
      closeObserver: { next: () => this.isConnected.set(false) },
    });

    this.socket$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        retry({
          delay: () => {
            this.isConnected.set(false);
            return timer(3000);
          },
        })
      )
      .subscribe({
        next: (data: string) => {
          this.messages.update((prev) => [...prev, { type: 'received', text: data }]);
        },
        error: (err) => {
          console.error('Connection error:', err);
          this.isConnected.set(false);
        },
        complete: () => {
          console.log('Socket stream completed');
        },
      });
  }

  public toggleChat() {
    this.chatOpened.update((v) => !v);
  }

  public sendMessage() {
    if (this.newMessage.trim() && this.isConnected()) {
      const text = this.newMessage;
      this.socket$.next(text);
      this.messages.update((prev) => [...prev, { type: 'sent', text }]);
      this.newMessage = '';
    }
  }
}
