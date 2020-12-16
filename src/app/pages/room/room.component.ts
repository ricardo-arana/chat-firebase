import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Mensaje } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';
import { mergeMap, map, take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
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
              private fireStore: AngularFirestore,
              private activadRoute: ActivatedRoute,
              private auth: AngularFireAuth) {
    
    const user$ = this.auth.user.pipe( map( user => user.displayName ), take(1));

    user$.subscribe( nickname => this.nickname = nickname);

    const parms$ = this.activadRoute.params.pipe(
      map<Params, string>( parms => parms['idRoom'].toString()));
    

    parms$.pipe(
      mergeMap( idRoom => this.obtenerMensajes(idRoom))
    ).subscribe(
      (documentos: any) => {
        this.mensajes = documentos.reverse();
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

  obtenerMensajes(idRoom: string): Observable<Mensaje[]> {
    this.idRoom = idRoom;
    return this.fireStore.collection(idRoom, ref => ref.orderBy('fecha','desc').limit(5) )
    .valueChanges({ idField: 'id'})
    .pipe( map( mensajes => mensajes as Mensaje[]) );
    
    
  }

  signpout() {
    this.auth.signOut()
    .then( () => this.router.navigateByUrl('/login'));
  }



}
