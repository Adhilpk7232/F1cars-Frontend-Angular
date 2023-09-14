import { Component,OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReviewerConnectionRes } from 'src/app/models/reviewerConnectionRes';
import { ReviewerServiceService } from 'src/app/services/reviewer/reviewer-service.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-reviewer-chat',
  templateUrl: './reviewer-chat.component.html',
  styleUrls: ['./reviewer-chat.component.css']
})
export class ReviewerChatComponent implements OnInit{
  
  connectionData:ReviewerConnectionRes[]=[]
  reviewerId!:string;
  allMessages:any[]=[]
  connectionId!:string;
  Connection!:any;
  chattingUserId!:string
  messageForm!:FormGroup
  viewerId!:string;
  selectedItem!: any;
  constructor(
    private reviewerApi:ReviewerServiceService,
    private toastr:ToastrService,
    private formBuilder:FormBuilder,
    private socket:Socket
    ){
      this.socket.connect();
  }
  ngOnInit(): void {
    this.getConnection()
    this.getReviewerId()
    console.log(this.viewerId,"viewerId in ng on Inint");
    
    this.socket.on('message recieved',(newMessage:any)=>{     
      console.log(this.viewerId,"viewrid,",newMessage.from,"from message");
       
      if (this.viewerId==newMessage.from) {
        this.allMessages.push(newMessage);

      }
      this.allMessages.push(newMessage);
    })

    this.messageForm = this.formBuilder.group({
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
  getConnection(){
    this.reviewerApi.getconnection().subscribe((res:any) =>{
      console.log(res,"catcDataa");
      this.connectionData = res.reviewerConnectionData
      this.viewerId = res.viewerId
      this.socket.emit('setup',res.viewerId)
    })
  }
  messagePage(connectionId:string){
    this.selectedItem = this.connectionData.find(item => item._id === connectionId);
    console.log(connectionId,"jjjjjjjjj");
    
    this.reviewerApi.getChattingReviewer(connectionId).subscribe((res:any) => { 
      this.Connection = res
      this.chattingUserId = res.user._id
    },(err) => { 
      console.log(err.error.messaeg);
      
    })
    this.getAllmessage(connectionId)
  }
  getReviewerId(){
    this.reviewerApi.getReviewerId().subscribe((res:string) =>{
      this.reviewerId = res
      console.log(this.reviewerId,"id");
      
    })
  }
  getAllmessage(connectionId:string){
    this.reviewerApi.getMessages(connectionId).subscribe((res:any) =>{
      this.socket.emit('join',connectionId)
      this.allMessages = res
      console.log(res,"allmesage");
      
    })
  }
  submit(){

    if(this.messageForm.valid){
      let messageForm = this.messageForm.getRawValue()
    console.log(messageForm.message,"entertd mesg");

    

    this.reviewerApi.sendMessage(this.Connection._id,messageForm).subscribe((res:any)=>{
      this.allMessages.push(res);
        this.socket.emit('chatMessage',res)
      // this.toastr.success(' message sended','Successfully', { progressBar: true });
      this.messageForm.get('message')?.setValue('');
    },(err) => {
      console.log(err,"error");
      
      this.toastr.error(err.error.message ,'', {progressBar: true})
    })
    }
    
    
  }

}
