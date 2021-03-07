import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GlobalConstants } from '../../conf/global-constants';
import { AllJobInfoService } from '../../service/all-job-info.service';
import { DbaSchedulerJobRunDetailDTO } from '../../dto/dba-scheduler-job-run-detail-dto';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-all-job-info',
  templateUrl: './all-job-info.component.html',
  styleUrls: ['./all-job-info.component.css']
})
export class AllJobInfoComponent implements OnInit {

applicationList:any;
config: any; 
allJobList: any[];
allJobName : any ;
allJobStstus : any ;
srcDate: Date;
jobSearchObj : DbaSchedulerJobRunDetailDTO = new  DbaSchedulerJobRunDetailDTO();

  constructor(private allJobInfoService: AllJobInfoService,private spinner: NgxSpinnerService) { 

    this.config = { currentPage: 1,  itemsPerPage: 50,  totalItems:3  };

    this.jobSearchObj.logDate = null;
    this.jobSearchObj.jobName = 'All';
    this.jobSearchObj.jobSubname = 'All';
    this.jobSearchObj.status = 'All';
    this.jobSearchObj.runDuration = 'All';

  }





  ngOnInit(): void {
  this.getPage(1);
  }

  getPage(page: number){
    this.spinner.show();
    this.loadPageConfiguration();
    this.config.currentPage=page;
    
    

    console.log(this.jobSearchObj);
    this.allJobInfoService.getAllJobDetail(this.jobSearchObj,page).subscribe(data =>{
        this.allJobList = this.getSupItemDataContent(data,'content');
        console.log(data);
        this.config.totalItems = this.getSupItemDataContent(data,'totalElements');
        this.spinner.hide();
    });
  }

  getSupItemDataContent(responseData:Object,contentName:any){
    return responseData[contentName];
  }

  loadPageConfiguration(){
    this.allJobName = GlobalConstants.allJobName;
    this.allJobStstus = GlobalConstants.allJobStstus;
  }

    jobSearchForm=new FormGroup({
    search_job_name:new FormControl('All'),
    search_job_status:new FormControl('All'),
    search_job_date:new FormControl(),
    search_job_duration_order:new FormControl('All'),
  });

      jobSearchFormSubmit(){
      this.jobSearchObj = new DbaSchedulerJobRunDetailDTO();
      this.jobSearchObj.logDate = this.getSRCLogDate;
      this.jobSearchObj.jobName = this.getSRCJobName.value;
      this.jobSearchObj.status = this.getSRCJobStstus.value;
      this.jobSearchObj.runDuration = this.getSRCJobDurationSort.value;
      console.log(this.jobSearchObj);
      this.getPage(1);
  }

  get getSRCLogDate(){
  let datePipe=new DatePipe("en-US");
  let newDateStr = this.jobSearchForm.get('search_job_date').value;
  return datePipe.transform(newDateStr, 'yyyy-MM-dd');
    
  }

  get getSRCJobName(){
    return this.jobSearchForm.get('search_job_name');
  }

  get getSRCJobStstus(){
    return this.jobSearchForm.get('search_job_status');
  }

  get getSRCJobDurationSort(){
    return this.jobSearchForm.get('search_job_duration_order');
  }

  dateToStr(dateobj:Date){
 let datePipe=new DatePipe("en-US");
 let latest_date = datePipe.transform(dateobj, 'yyyy-MM-dd');
}

}
