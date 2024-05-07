import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { Chart, ChartModule } from 'angular-highcharts';
import { UserProfileService } from '../../core/services/user-profile.service';
import { CommonModule } from '@angular/common';
import { Orders } from '../../core/interfaces/orders';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { InputdashBoardPipe } from '../../core/pipe/input-dashboard.pipe';




@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule,InputdashBoardPipe,FormsModule,NgxPaginationModule,SideNavComponent,ChartModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent {
  allOrders:Orders[]=[];
  totalOrders:number=0;
  isLoading:boolean=false;
  pageSize:number=0;
  currentPage:number=0;
  total:number=0;
  couterOrders: number = 0;
  totalNewOrders:number=3874;
  counterNewOrders:number=0;
  counterPendingOrders:number=0;
  totalPendingOrders:number=1548;
  counterShippingOrders:number=0;
  totalShippingOrders:number=9543;
  counterDeliveredOrders:number=0;
  totalDeliveredOrders:number=5543;
  counterCancelledOrders:number=0;
  totalCancelledOrders:number=3863;
  sortAscenId:boolean=true;
  inputSearch: string = '';
  numOfPages:number=0;
  sortBy:string='latest';
 constructor(
  private _UserProfileService:UserProfileService,
 ){}

 ngOnInit(): void {
  this.isLoading=true;
  this._UserProfileService.getAllOrders().subscribe({
    next:(res)=>{
     this.allOrders=res.data;
     this.numOfPages=res.metadata.numberOfPages;
     this.totalOrders=res.results;
     this.isLoading=false;
     this.pageSize=res.metadata.limit;
     this.currentPage=res.metadata.currentPage;
     this.total=res.results;
    },
    error:(err)=>{
      this.isLoading=false;
    }
  });
  this.counterOrders();
  this.countNewOrders();
  this.countPendingOrders();
  this.countShippingOrders();
  this.countDeleviredOrders();
  this.countCancelledOrders();
 }
counterOrders():void{
  let count = 0;
  setInterval(() => {
    if (this.couterOrders <= this.totalOrders) {
      this.couterOrders += count++;
    } else {
      return;
    }
  }, 7);
}
countNewOrders():void{
  let count = 0;
  setInterval(() => {
    if (this.counterNewOrders <= this.totalNewOrders) {
      this.counterNewOrders += count++;
    } else {
      return;
    }
  }, 20);
}
countPendingOrders():void{
  let count = 0;
  setInterval(() => {
    if (this.counterShippingOrders <= this.totalShippingOrders) {
      this.counterShippingOrders += count++;
    } else {
      return;
    }
  }, 15);
}
countShippingOrders():void{
  let count = 0;
  setInterval(() => {
    if (this.counterPendingOrders <= this.totalPendingOrders) {
      this.counterPendingOrders += count++;
    } else {
      return;
    }
  }, 30);
}
countDeleviredOrders():void{
  let count = 0;
  setInterval(() => {
    if (this.counterDeliveredOrders <= this.totalDeliveredOrders) {
      this.counterDeliveredOrders += count++;
    } else {
      return;
    }
  }, 20);
}
countCancelledOrders():void{
  let count = 0;
  setInterval(() => {
    if (this.counterCancelledOrders <= this.totalCancelledOrders) {
      this.counterCancelledOrders += count++;
    } else {
      return;
    }
  }, 30);
}

  testChart=new Chart({
  title: {
    text: 'Orders Paid'
  },
  credits: {
    enabled: false // This removes the Highcharts.com reference
  },
  chart: {
    height: 300,
    borderRadius:6 // Adjust this value to decrease the height
  },
  series:[
   {
    type:'pie',
    innerSize: '50%',
    data:[
      {name:'Paid',y:3,color:"#EAB308"},
      {name:'Not Paid',y:1,color:'#A855F7'},
    ]
   }

  ]
 })
  testChart2=new Chart({
  title: {
    text: 'Orders delivery'
  },
  credits: {
    enabled: false
  },
  chart: {
    height: 300,
    borderRadius:6
  },
  series:[
   {
    type:'pie',
    innerSize: '50%',
    data:[
      {name:'Delevered',y:3,color:'#249782'},
      {name:'Not',y:1,color:"#F97316"},
    ]
   }

  ]
 })

 lineChart = new Chart({
  chart: {
    type: 'line',
    height: 300,
    borderRadius:6
  },
  credits: {
    enabled: false
  },
  title: {
    text: 'Orders Overview'
  },
  xAxis: {
    categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
    ,
    yAxis: {
      title: {
        text: 'Number of Orders'
      }
    },
    series: [{
      name: 'Orders',
      color: '#3B82F6',
      data: [
        [0, 100],
          [1, 30],
          [2, 50],
          [3, 170],
          [4, 20],
          [5, 70],
          [6, 120],
          [7, 40],
          [8, 70],
          [9, 30],
          [10, 200],
        // Add more data for other months...
      ]
    }as Highcharts.SeriesLineOptions
  ]
  });

  pageChanged(event:any):void{
   let num=event;
   if(this.sortBy=='earliest'){
      num=this.numOfPages-event+1;
   }
   this._UserProfileService.getAllOrders(num).subscribe({
    next:(res)=>{
     this.allOrders=res.data;
     this.totalOrders=res.results;
     this.pageSize=res.metadata.limit;
     this.currentPage=event
     this.total=res.results;
    }
  });
  }

  toggoleSortId(): void {
    this.sortAscenId = !this.sortAscenId;
}

onSortChanges(event:any){
  let num=1;
if(event=='earliest'){
  num=this.numOfPages;
}
  this._UserProfileService.getAllOrders(num).subscribe({
    next:(res)=>{
     this.allOrders=res.data;
     this.numOfPages=res.metadata.numberOfPages;
     this.totalOrders=res.results;
     this.isLoading=false;
     this.pageSize=res.metadata.limit;
     this.currentPage=(num-res.metadata.currentPage+1);
     this.total=res.results;
    },
    error:(err)=>{
      this.isLoading=false;
    }
  });
}
}

