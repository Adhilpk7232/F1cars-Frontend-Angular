import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

declare const Razorpay: any;

@Component({
  selector: 'app-subcription',
  templateUrl: './subcription.component.html',
  styleUrls: ['./subcription.component.css']
})
export class SubcriptionComponent implements OnInit{

  subscritionAvtive!:boolean;
  subscriptionData:any;

  plans:any[]=[]
  planData:any;
  selectedPlan: string = '';
  constructor(private userApi:UserServiceService,private router:Router){}

  ngOnInit(): void {
    this.checkPlanExist()
    this.getPlan()
  }
  checkPlanExist(){
    this.userApi.checkPlanExist().subscribe((res:any) => {
      console.log(res);
      this.subscriptionData = res.subscriptionData
      this.subscritionAvtive = true
      
    },(err) => {
      this.subscritionAvtive = false;
      console.log(err.error.message);
      
    })
  }
  getPlan(){
    this.userApi.getplans().subscribe((res:any)=> {
      this.plans = res
    })
  }

  selectPlan(plan: string): void {
    this.userApi.findPlan(plan).subscribe((res:any) => {
      this.planData = res;
    },(err) =>{
      console.log("Somthing wrong")
    })
    this.selectedPlan = plan;

  }
  buy(selectedPlan: string) {
    console.log(`Buying plan: ${selectedPlan}`);  
    if(this.planData){
      const options ={
        key:'rzp_test_ejR8ywN9fvcbY6',
        amount: this.planData.price*100,
        currency:'INR',
        name:'F1CARS',
        descrption:'Plan Payment',
        image:'',
        handler:(response:any) => {
          if(response.razorpay_payment_id){
            this.planData.paymentId = response.razorpay_payment_id
            this.userApi.planActivate(this.planData).subscribe((response:any) => {
              this.router.navigate(['/']);
            },(err) => {
              console.log(err.error.message);
              
            })
            console.log(response,"pay,ent success");
            
          }else{
            console.log("something wron in payment");
            
          }
        },
        prefill:{
          name:'',
          email:'',
          contact:''
        }

      };
      const razorpayInstance = new Razorpay(options);
      razorpayInstance.open();
    }

  }
}
