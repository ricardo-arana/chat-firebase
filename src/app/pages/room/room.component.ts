import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  nickname: string;
  idRoom: string;
  constructor(private chatService: ChatService) {
    this.nickname = this.chatService.nickname;
    this.idRoom = this.chatService.idRoom;
   }

  ngOnInit(): void {
  }

}
