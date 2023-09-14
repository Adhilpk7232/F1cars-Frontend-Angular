import { Component,OnInit,Input , ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit{

  @Input() reviewerId!:string

  messageForm!:FormGroup;
  chatReviewers:any[] = []
  chattingreviewerId!:String;
  chatmessage:any[]=[];
  viewerid!:string;
  Connection!:any;
  allMessages:any;
  selectedItem!: any;
  searchName!:string;
  // reviewerId!:string|null;

  constructor(
    private cdr: ChangeDetectorRef,
    private userApi:UserServiceService,
    private formbuilder:FormBuilder,
    private toastr:ToastrService,
    private route: ActivatedRoute,
    private socket:Socket,
  ){

  }

  ngOnInit(): void {
    this.findConnection()
    
    this.socket.on('message recieved',(newMessage:any)=>{   
      
      console.log(this.viewerid,"viewrid,",newMessage.from,"from message");
      if (this.viewerid==newMessage.from) {
        this.allMessages.push(newMessage);
      }
      this.allMessages.push(newMessage);
      this.scrollToBottom();
    })

    this.messageForm = this.formbuilder.group({
      message:['',Validators.required]
    })
    
  }
  @ViewChild('messageContainer', { static: false }) messageContainer!: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      // Handle any errors related to scrolling (if necessary)
    }
  }



  findConnection(){
    this.userApi.findConnection().subscribe((res:any) => {
      this.chatReviewers = res.connectionData
      this.viewerid = res.userId
     
      console.log(res,"find connection response");
      this.socket.emit('setup',this.viewerid)
      
    },(err) => {
      console.log(err.error.message);
      
    })
  }

  messagePage(connectionId:string){
    this.selectedItem = this.chatReviewers.find(item => item._id === connectionId);
    console.log(connectionId,"jjjjjjjjj");
    this.userApi.getChattingReviewer(connectionId).subscribe((res:any) => { 
      this.Connection = res
      this.chattingreviewerId = res.reviewer._id
    },(err) => { 
      console.log(err.error.messaeg);
      
    })
    this.findMessage(connectionId)
  }
  findMessage(connectionId:string){
    this.userApi.getMessages(connectionId).subscribe((res:any)=>{
      this.socket.emit('join',connectionId)
      console.log(connectionId,"connectionId");
      
      this.allMessages = res
      
    },(err) => {
      console.log(err.error.message);
      
    })
  }
  submit(){

    let messageForm = this.messageForm.getRawValue()

    this.userApi.sendMessage(this.Connection._id,messageForm).subscribe((res:any)=>{  
      this.allMessages.push(res);
      this.socket.emit('chatMessage',res)
      console.log(res,"NEW MESG SUBMITED RESPONSE");
      this.messageForm.get('message')?.setValue('');
      
    },(err) => {
      console.log(err,"error");
      
      this.toastr.error(err.error.message ,'', {progressBar: true})
    })
    
  }

}
