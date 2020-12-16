import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mensaje } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  nickname: string;
  idRoom: string;
  mensajes: Mensaje[];
  forma: FormGroup;
  elemento: any;

  constructor(private chatService: ChatService,
              private router: Router,
              private fireStore: AngularFirestore) {
    this.nickname = this.chatService.nickname;
    this.idRoom = this.chatService.idRoom;
    if(!this.nickname || !this.idRoom) {
      this.router.navigateByUrl('/login');
    }
    this.fireStore.collection(this.idRoom, ref => ref.orderBy('fecha','desc').limit(5) )
    .valueChanges({ idField: 'id'}).subscribe(
      (documentos: any) => {
        this.mensajes = documentos.reverse();
        console.log(this.mensajes)

        // this.mensajes = documentos.reverse();
        this.irAlFinal();
      }
    );

    this.forma = new FormGroup({
      mensaje: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensaje');
    console.log(this.elemento);
  }

  enviarMensaje() {
    if(this.forma.invalid) {
      return;
    }
    const mensajeNuevo: Mensaje = {
      nickname: this.nickname,
      mensaje: this.mensajeForm,
      fecha: new Date()
    };

    this.fireStore.collection(this.idRoom)
        .add(mensajeNuevo)
        .then( res => {
          console.log(res);
          this.setMensajeForm = '';
        });

  }

  get mensajeForm() {
    return this.forma.get('mensaje').value;
  }

  set setMensajeForm(value: string) {
    this.forma.get('mensaje').setValue(value);
  }

  irAlFinal() {
    setTimeout( () => {
      this.elemento.scrollTop = this.elemento.scrollHeight;
    },20);
  }

  trackById(element: Mensaje, index: number) {
    return element.id;
  }

}
