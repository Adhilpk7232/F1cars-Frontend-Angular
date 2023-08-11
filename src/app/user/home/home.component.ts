import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user/user-service.service';
declare var Razorpay: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  loading:boolean = true
  paymentId:any;
  paymentStatus!:string;

  popularCars:any[]=[]
  justLaunched:any[]=[]
  upcommingCars:any[]=[]

  brand:any[]=[]
  plans:any[]=[]

  SinglePlan:any;
  selectedPlan: string = '';
  constructor(private userApi:UserServiceService){}

  
  selectedItem:string='POPULAR';
  ngOnInit(): void {
    this.loading = false;
    this.getPlan()
    this.getBrand()
    this.getPopularCars()
   
    this.userApi.getJustLaunched().subscribe((res:any)=>{
      this.justLaunched =res
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
    this.userApi.getUpcommingCars().subscribe((res:any)=>{
      this.upcommingCars =res
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }
  getBrand(){
    this.userApi.getBrands().subscribe((res:any)=> {
      this.brand = res
      console.log(res);
      
    },(error) => {
      console.log(error.error.message,"error on fetching brands");
      
    })
  }
  getPlan(){
    this.userApi.getplans().subscribe((res:any)=> {
      this.plans = res
    })
  }
  getPopularCars(){
    this.userApi.getPopularCars().subscribe((res:any)=>{
      this.popularCars =res
      console.log(res);
      
    },(err)=>{
      console.log(err.error.message);
      
    })
  }

  selectItem(item:string){
    this.selectedItem=item
  }

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    // this.userApi.getPlanDeatails(plan)

  }
  buy(selectedPlan: string) {
    console.log(`Buying plan: ${selectedPlan}`);
    const RzorpayOptions ={
      description:"",
      currency:"INR",
      amount:3000,
      name:"Adhil Pk",
      key:'rzp_test_ejR8ywN9fvcbY6',
      image:'https://imgd.aeplcdn.com/664x374/n/cw/ec/39472/a6-exterior-right-front-three-quarter.jpeg?q=75&q=75',
      prefil:{
        name:'user kumar',
        email:"user@gmail.com",
        phone:'8080808080'
      },
      theme:{
        color:'#f37254'
      },
      modal:{
        ondismiss:() =>{
          console.log('dismissed');
          
        }
      }
    }
    const successCallback = (paymentid:any) => {
      console.log(paymentid);
      this.paymentId = paymentid
      this.paymentStatus = 'success'
      
    }
    const failureCallback = (e:any) => { 
      console.log(e);
      this.paymentStatus = 'failed'
      
    }
    Razorpay.open(RzorpayOptions,successCallback,failureCallback)
  }
  
}
