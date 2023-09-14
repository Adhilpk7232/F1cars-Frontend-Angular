import { Component,OnInit,Input, EventEmitter, Output } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { userIdRes } from 'src/app/models/userIdRes';
import { Socket } from "ngx-socket-io";
import { log } from 'console';



@Component({
  selector: 'app-chat-review-list',
  templateUrl: './chat-review-list.component.html',
  styleUrls: ['./chat-review-list.component.css']
})
export class ChatReviewListComponent implements OnInit{

  @Input()Subscribe!:boolean;
  @Output() messageEvent = new EventEmitter<string>();
  reviewers:any[] = [];
  chatReviewers:any[] = []
  Connection!:any;
  messageForm!:FormGroup;
  chattingreviewerId!:String;
  chatmessage:any[]=[]
  allMessages:any;
  userId!:string;
  newmessage!:string
  viewerid!:string;
  connectionCreated:any;

  constructor(
    private userApi:UserServiceService,
    private router:Router,
    private formbuilder:FormBuilder,
    private toastr:ToastrService,
    private socket:Socket,
  ){
    this.socket.connect();
  }
  ngOnInit(): void {
    this.getReviewers()

  }

  
  getReviewers(){
    this.userApi.getReviewers().subscribe((res:any) => {
      this.reviewers  = res
    },(err) => {
      console.log(err.error.message);
      
    })
  }
  chatConnection(reviewerId:string){
    this.userApi.createConnection(reviewerId).subscribe((res:any) => {
      this.connectionCreated = res
      console.log(res);
    },(err) => {
      console.log(err.error.message);
      
    })
    const id = reviewerId;
     this.messageEvent.emit(id);
  }
    
}
