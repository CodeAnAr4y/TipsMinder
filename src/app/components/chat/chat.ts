import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { retry, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chat implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private socket$!: WebSocketSubject<any>;
  newMessage = '';

  close = output<void>();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.close.emit();
    }
  }

  messages = signal<{ type: 'sent' | 'received'; text: string }[]>([]);
  isConnected = signal(false);

  ngOnInit() {
    this.connect();
  }

  private connect() {
    this.socket$ = webSocket({
      url: 'ws://ws.ifelse.io',
      deserializer: (msg) => msg.data,
      openObserver: { next: () => this.isConnected.set(true) },
      closeObserver: { next: () => this.isConnected.set(false) },
    });

    this.socket$
      .pipe(
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
      });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.isConnected()) {
      const text = this.newMessage;
      this.socket$.next(text);
      this.messages.update((prev) => [...prev, { type: 'sent', text }]);
      this.newMessage = '';
    }
  }

  ngOnDestroy() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
