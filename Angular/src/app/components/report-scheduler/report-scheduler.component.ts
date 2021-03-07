import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ReportMailSchedulerService } from '../../service/report-mail-scheduler.service';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import { ReportQueryMaster } from "../../entity/report-query-master";


@Component({
  selector: 'app-report-scheduler',
  templateUrl: './report-scheduler.component.html',
  styleUrls: ['./report-scheduler.component.css']
})
export class ReportSchedulerComponent implements OnInit {

config: any; 
allReportScheduleList: any[];
allReportScheduleSettingsDataList:any[];
reportQueryMasterObj : ReportQueryMaster =new ReportQueryMaster();
submitted = false;


  constructor(private reportMailSchedulerService: ReportMailSchedulerService,private spinner: NgxSpinnerService) { 
  	this.config = { currentPage: 1,  itemsPerPage: 50,  totalItems:3  };
  }

  ngOnInit(): void {
  this.getPage(1);
  }

    getPage(page: number){
    this.spinner.show();
    this.config.currentPage=page;
    
    this.reportMailSchedulerService.getAllReportScheduleList(page).subscribe(data =>{
        this.allReportScheduleList = this.getSupItemDataContent(data,'content');
        console.log(data);
        this.config.totalItems = this.getSupItemDataContent(data,'totalElements');
        this.spinner.hide();
    });
  }

    getSupItemDataContent(responseData:Object,contentName:any){
    return responseData[contentName];
  }

    schedulReportForm=new FormGroup({
    report_query_id:new FormControl(),
    report_name:new FormControl('',[Validators.required]),
    report_filename:new FormControl(),
    sheet_name:new FormControl(),
    report_description:new FormControl(),
    mail_to:new FormControl(),
    mail_cc:new FormControl(''),
    mail_subject:new FormControl(''),
    mail_body:new FormControl(),
    report_query:new FormControl('')
  });

    saveSchedulReportForm(){
    this.reportQueryMasterObj = new ReportQueryMaster();
    this.reportQueryMasterObj.reportQuery=this.getReportQuery.value;
    this.reportQueryMasterObj.mailTo=this.getMailTo.value;
    this.reportQueryMasterObj.mailCc=this.getMailCc.value;
    this.reportQueryMasterObj.mailSubject=this.getMailSubject.value;
    this.reportQueryMasterObj.mailBody=this.getMailBody.value;
    this.reportQueryMasterObj.reportFilename=this.getReportFilename.value;
    this.reportQueryMasterObj.reportSheetName=this.getReportSheetName.value;
    this.reportQueryMasterObj.reportName=this.getReportName.value;
    this.reportQueryMasterObj.reportDescription=this.getReportDescription.value;
    this.submitted = true;
    if(this.getReportQueryId.value==null || this.getReportQueryId.value==''){
         this.saveSchedulReport();
         this.schedulReportForm.reset();
    }else{
        this.reportQueryMasterObj.reportQueryId=this.getReportQueryId.value;
        this.updateSchedulReport();
        this.schedulReportForm.reset();
    }
    this.submitted=false;
  }

resetModalForm(){
  this.schedulReportForm.reset();
}

  saveSchedulReport() {
    this.reportMailSchedulerService.createReportSchedule(this.reportQueryMasterObj)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.reportQueryMasterObj = new ReportQueryMaster();
  }

  updateSchedulReport(){
    this.reportMailSchedulerService.updateReportSchedule(this.reportQueryMasterObj.reportQueryId,this.reportQueryMasterObj)
      .subscribe(data => {
        this.getPage(this.config.currentPage);
        this.modalCloseJquery();
      });
    this.reportQueryMasterObj = new ReportQueryMaster();
  }



  removeSchedulerReport(reportQueryId){
      if(confirm("Are you sure to delete this Item "+reportQueryId)) {
        console.log("Implement delete functionality here");
        this.reportMailSchedulerService.removeReportSchedule(reportQueryId)
            .subscribe(data => {
            this.getPage(this.config.currentPage);
        });
        }
    }

playSchedulerReport(reportQueryId){
  this.spinner.show();
  this.reportMailSchedulerService.playReportQueryTest(reportQueryId)
      .subscribe(data => {
        console.log(data);
        this.spinner.hide();
      });
}

reportQueryActiveInactiveUpdate(reportQueryId,activeInactiveStat){
  this.spinner.show();
  this.reportMailSchedulerService.updateReportQueryActiveInactiveStat(reportQueryId,activeInactiveStat,this.reportQueryMasterObj)
      .subscribe(data => {
        console.log(data);
        this.getPage(this.config.currentPage);
        this.spinner.hide();
      });
}



reloadReportQueryMailConf(){
  this.spinner.show();
  this.reportMailSchedulerService.reloadReportQueryMailConf()
      .subscribe(data => {
        console.log(data);
        this.spinner.hide();
      });
}

  viewSchedulerReport(reportQueryId){
    this.reportQueryMasterObj = new ReportQueryMaster();
    this.reportMailSchedulerService.getReportSchedule(reportQueryId).subscribe(data =>{
         this.schedulReportForm.patchValue({
         report_query_id:this.UpdatableItem(data,'reportQueryId'),
         report_query:this.UpdatableItem(data,'reportQuery'),
         mail_to:this.UpdatableItem(data,'mailTo'),
         mail_cc:this.UpdatableItem(data,'mailCc'),
         mail_subject:this.UpdatableItem(data,'mailSubject'),
         mail_body:this.UpdatableItem(data,'mailBody'),
         report_filename:this.UpdatableItem(data,'reportFilename'),
         sheet_name:this.UpdatableItem(data,'reportSheetName'),
         report_name:this.UpdatableItem(data,'reportName'),
         report_description:this.UpdatableItem(data,'reportDescription')});
    });
  }

  UpdatableItem(updateItemObject:Object,updateItemName:any){
    return updateItemObject[updateItemName];
  }

    modalCloseJquery(){
    setTimeout(function() { 
          this.$('#reportquerymodal').modal('hide'); 
          this.$("#reportQuerySubmitButton").prop('disabled', false);
          this.$("#reportQuerySubmitButton").prop('class', 'btn btn-info');
          this.$("#reportQuerySubmitButton").text("Save changes");
        }, 1000);
  }

  viewScheduledListForReport(reportQueryId){    
        this.reportMailSchedulerService.getAllReportSchedulerSettingByQueryID(reportQueryId).subscribe(data =>{
        this.allReportScheduleSettingsDataList = data;
        console.log(this.allReportScheduleSettingsDataList);
    });
  }

    schedulergridsetting = {
    actions: {
      position: 'right',
    },
    pager:{
      perPage:14
    },

    columns: {
      reportDay: {
        title: 'DAY',
        filter:false,
      },
      reportTime: {
        title: 'Time',
        filter:false,
      },
      generateReport: {
        title: 'Report',
        filter:false,
      },
      sendMail: {
        title: 'Email',
        filter:false,
      },
      activeInactive: {
        title: 'Active',
        filter:false,
      },
      
    }
  };


getColorClass(activestatus: string) {
  let returnValue;
 if(activestatus=='A'){
    returnValue = 'reportSchedulerActive';
 }else{
 returnValue='';
 }

return returnValue ;
}

  get getReportQueryId(){
    return this.schedulReportForm.get('report_query_id');
  }
  get getReportQuery(){
    return this.schedulReportForm.get('report_query');
  }
  get getMailTo(){
    return this.schedulReportForm.get('mail_to');
  }
  get getMailCc(){
    return this.schedulReportForm.get('mail_cc');
  }
  get getMailSubject(){
    return this.schedulReportForm.get('mail_subject');
  }
  get getMailBody(){
    return this.schedulReportForm.get('mail_body');
  }
  get getReportFilename(){
    return this.schedulReportForm.get('report_filename');
  }
  get getReportSheetName(){
    return this.schedulReportForm.get('sheet_name');
  }
  get getReportName(){
    return this.schedulReportForm.get('report_name');
  }
  get getReportDescription(){
    return this.schedulReportForm.get('report_description');
  }

}
