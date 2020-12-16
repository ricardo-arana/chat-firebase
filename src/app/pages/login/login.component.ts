import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import firebase from 'firebase/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  constructor(private chatService: ChatService,
              private router: Router,
              private auth: AngularFireAuth) {
    this.forma =  new FormGroup({
      idRoom: new FormControl('123', Validators.required)
    })
   }

  ngOnInit(): void {
  }

  continuar(value: firebase.auth.UserCredential) {
    console.log(this.chatService.idRoom);
    // this.chatService.idRoom = this.forma.get('idRoom').value;
    // this.chatService.nickname = value.user.displayName;
    this.router.navigate(['/room', this.forma.get('idRoom').value])
      
      
  }

  logearConGoogle() {
    if(this.forma.invalid) { return; }
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      //.then( this.continuar);
      .then( value => this.continuar(value))
  }

  logearConGithub() {
    if(this.forma.invalid) { return; }
    this.auth.signInWithPopup( new firebase.auth.GithubAuthProvider())
    .then( value => this.continuar(value))
  }

}
