import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  constructor(private chatService: ChatService,private router: Router) {
    this.forma =  new FormGroup({
      idRoom: new FormControl('123', Validators.required),
      nickname: new FormControl('Ricardo', [Validators.required, Validators.minLength(4)])
    })
   }

  ngOnInit(): void {
  }

  continuar() {
    if(this.forma.invalid) { return; }
      this.chatService.idRoom = this.forma.get('idRoom').value;
      this.chatService.nickname = this.forma.get('nickname').value;
      this.router.navigateByUrl('/room');
  }

}
