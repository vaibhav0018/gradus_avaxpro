
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// import { MatSnackBar,  MatDialogRef, MAT_DIALOG_DATA, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CommonSnackbarComponent } from '../../../shared/components/common-snackbar/common-snackbar/common-snackbar.component';
//import { DocumentListModel } from '../../../challan/components/challan-menu.model';
import { UtilityServiceAvaxPro } from '../../../core/services/utility/utility_avaxpro.service';
import { FileDescriptionModel } from 'src/app/core/services/utility/common/common-entity.model';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { ConstantsServiceAvaxPro } from '../../../core/services/constants_avaxpro.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '../entry/commons/date-adapter/app-date-adapter.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
  providers: [{
    provide: DateAdapter, useClass: AppDateAdapter
  },
  { provide: DatePipe },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }],
})
export class GenericDialogComponent implements OnInit {

  form: FormGroup
  fileDescriptionLists: any = []
  uploadResponse: any;

  modalTitle: string
  modalSubTitle=''
  otherDescFlg: boolean = false;
  module_flg:string=''
  utilityData: any;
  flgFileUpload:boolean =false
  flgUtilityTable:boolean =false

  flgPartyOrderDetails:boolean =false
  lstPartyOrderRef = []
  rowData = []

  hrs: any= [
    { value: '01', viewValue: '01' },
    { value: '02', viewValue: '02' },
    { value: '03', viewValue: '03' },
    { value: '04', viewValue: '04' },
    { value: '05', viewValue: '05' },
    { value: '06', viewValue: '06' },
    { value: '07', viewValue: '07' },
    { value: '08', viewValue: '08' },
    { value: '09', viewValue: '09' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' },
    { value: '13', viewValue: '13' },
    { value: '14', viewValue: '14' },
    { value: '15', viewValue: '15' },
    { value: '16', viewValue: '16' },
    { value: '17', viewValue: '17' },
    { value: '18', viewValue: '18' },
    { value: '19', viewValue: '19' },
    { value: '20', viewValue: '20' },
    { value: '21', viewValue: '21' },
    { value: '22', viewValue: '22' },
    { value: '23', viewValue: '23' },
    { value: '00', viewValue: '00' },
  ];

  mins: any = [
    { value: '00', viewValue: '00' },
    { value: '01', viewValue: '01' },
    { value: '02', viewValue: '02' },
    { value: '03', viewValue: '03' },
    { value: '04', viewValue: '04' },
    { value: '05', viewValue: '05' },
    { value: '06', viewValue: '06' },
    { value: '07', viewValue: '07' },
    { value: '08', viewValue: '08' },
    { value: '09', viewValue: '09' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' },
    { value: '13', viewValue: '13' },
    { value: '14', viewValue: '14' },
    { value: '15', viewValue: '15' },
    { value: '16', viewValue: '16' },
    { value: '17', viewValue: '17' },
    { value: '18', viewValue: '18' },
    { value: '19', viewValue: '19' },
    { value: '20', viewValue: '20' },
    { value: '21', viewValue: '21' },
    { value: '22', viewValue: '22' },
    { value: '23', viewValue: '23' },
    { value: '24', viewValue: '24' },
    { value: '25', viewValue: '25' },
    { value: '26', viewValue: '26' },
    { value: '27', viewValue: '27' },
    { value: '28', viewValue: '28' },
    { value: '29', viewValue: '29' },
    { value: '30', viewValue: '30' },
    { value: '31', viewValue: '31' },
    { value: '32', viewValue: '32' },
    { value: '33', viewValue: '33' },
    { value: '34', viewValue: '34' },
    { value: '35', viewValue: '35' },
    { value: '36', viewValue: '36' },
    { value: '37', viewValue: '37' },
    { value: '38', viewValue: '38' },
    { value: '39', viewValue: '39' },
    { value: '40', viewValue: '40' },
    { value: '41', viewValue: '41' },
    { value: '42', viewValue: '42' },
    { value: '43', viewValue: '43' },
    { value: '44', viewValue: '44' },
    { value: '45', viewValue: '45' },
    { value: '46', viewValue: '46' },
    { value: '47', viewValue: '47' },
    { value: '48', viewValue: '48' },
    { value: '49', viewValue: '49' },
    { value: '50', viewValue: '50' },
    { value: '51', viewValue: '51' },
    { value: '52', viewValue: '52' },
    { value: '53', viewValue: '53' },
    { value: '54', viewValue: '54' },
    { value: '55', viewValue: '55' },
    { value: '56', viewValue: '56' },
    { value: '57', viewValue: '57' },
    { value: '58', viewValue: '58' },
    { value: '59', viewValue: '59' },
  ];

  
  flgPartyOrderNo: any = false
  flgOrderByName: any = false
  
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private fileUploadService: FileUploadService,
    private dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {

    this.modalTitle = data.title

    
    this.form = this.formBuilder.group({
      cmbFileDesc: [''],
      txtUploadFile: [''],
      cmbDocList: [''],
      txtFileUploadDesc: [''],
      cmbPartyOrderRef: [''],
      txtOrderByName: [''],
      txtPartyOrderNo: [''],
      dtPartyOrderDate: [''],
      timeHrs:['00'],
      timeMin:['00'],
    })

  }

  ngOnInit() {
    this.module_flg = this.data.module_flg
    this.flgFileUpload=false
    this.flgUtilityTable=false

    if(this.module_flg=='STPG_HISTORY'){     
      this.flgUtilityTable=true 
      this.utilityData = this.data.stpg_data
    } else if(this.module_flg=='TRNSFR_PDC_ISSUE' || this.module_flg=='ITEM_CODE_MASTER_UPLOAD' || this.module_flg=='IN_TRANSIT_SR_UPLOAD' || this.module_flg=='ITEM_EXTEND_UPLOAD' || this.module_flg=='MODIFY_LIST_PRICE_MENU' || this.module_flg=='CF_CHQ_COLL' || this.module_flg=='UPLOAD_CUST_PAYMENT_TO_CHNL_FIN'|| this.module_flg=='SHOW_ERROR'){
      this.flgUtilityTable=true 
      this.utilityData = this.data.table_data
    }
    else if(this.module_flg=='PRODUCT_DETAIL'){     
      this.flgUtilityTable=true 
      this.utilityData = this.data.prod_data
      this.modalSubTitle='Item Code : '+this.data.item_code+ ' '.repeat(4)+'Product Code : ' +this.data.subtitle
    }
    else if(this.module_flg=='AO_PARTY_ORDER_DETAILS'){
      this.flgPartyOrderDetails = true
      this.rowData = this.data.row_data
      this.loadData(this.rowData);      
    }
    else{
      this.flgFileUpload=true
      this.getFileDescription();
    }

  }
  


  getFileDescription() {
    this.utilityServiceAvaxPro.getFileDescription().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          //this.fileDescriptionLists = null;
          this.fileDescriptionLists = data.responseData[0].map(item => {
            return new FileDescriptionModel(item.fd_code, item.fd_description)
          })
        }
        return this.fileDescriptionLists
      },
      error => {
        console.log(error)
      }
    )

  }

  fileUpload: File;
  onFileChange(fileInput: any) {
    this.fileUpload = <File>fileInput.target.files[0];
  }

  uploadFile() {
    if (this.form.controls.cmbFileDesc.value.fd_description == undefined) {
      this.openSnackBar('Please select DESCRIPTION.');
      return false;
    }
    if (this.form.controls.txtUploadFile.value == '') {
      this.openSnackBar('Please select File.');
      return false;
    }

    if(!this.utilityServiceAvaxPro.checkValidationForFileUpload(this.fileUpload)){
      this.openSnackBar("File Name should'nt have spaces");
      return false;
    }

    if (this.otherDescFlg) {
      if (this.form.get("txtFileUploadDesc").value == null ||
        this.form.get("txtFileUploadDesc").value == '' ||
        this.form.get("txtFileUploadDesc").value == undefined) {
        this.openSnackBar('Please Enter description.');
        return false;
      }
    }

    const formData = new FormData();
    formData.append('docFile', this.fileUpload);
    formData.append('docBranch', atob(sessionStorage.getItem(btoa('usr_of_branch'))));
    formData.append('docSiscon', atob(sessionStorage.getItem(btoa('usr_of_siscon'))));
    formData.append('docCompany', atob(sessionStorage.getItem(btoa('usr_company_code'))));
    formData.append('docUser', atob(sessionStorage.getItem(btoa('userId'))));
    formData.append('docNo', this.data.doc_no);
    formData.append('docType', this.data.module_flg);// module_flg==AO
    formData.append('docFileDesc', this.otherDescFlg == true ?
      this.form.get("txtFileUploadDesc").value :
      this.form.controls.cmbFileDesc.value.fd_description);
    formData.append('docFileName', this.fileUpload.name);

    this.fileUploadService.uploadFile(formData).subscribe(
      (res) => {
        this.fileUpload = null;
        this.form.get("txtUploadFile").setValue("");
        this.openSnackBar("" + res.message);
        this.closeDialog();
      },
      (err) => {
        this.fileUpload = null;
        this.form.get("txtUploadFile").setValue("");
        this.openSnackBar("Error In File Upload.");
      }
    );
  }

  otherDescFlgFun(event: any) {
    console.log('event =', event);
    //console.log(event.value);
    if (event.source.value.fd_description.toUpperCase() == "OTHERS") {
      this.otherDescFlg = true;
    } else {
      this.otherDescFlg = false;
    }
    console.log('otherDescFlg = ', this.otherDescFlg);
  }

  closeDialog() {
    this.dialogRef.close('close');
  }

  openSnackBar(message) {
    this.snackBar.openFromComponent(CommonSnackbarComponent, {
      data: message,
      duration: 1000,
      panelClass: ['blue-snackbar']
    });
    UtilityServiceAvaxPro.showErrMessage(this.snackBar,message)
  }

  commonFunc(row: any) {
    console.log('row',row)
    if(this.module_flg=='IN_TRANSIT_SR_UPLOAD'){
      let queryParams = {
        stm_sr_no: row.vch_no,
        stm_sr_date: '',
        stm_sr_type: 'SIN', //row.sr_type,
        stm_sr_subtype: 'FR', //row.sr_subtype,
        gd_short_name: '',
        stm_godown_code: row.gdcode,
        gd_godown_name: '',
        gd_pb_allow: '',
        stm_cus_sup_code: '',
        stm_src_code: '',
        draft: true,
        draftno: '',
        routeFrom: 'viewCompleteSR',
        pbNo: '',
        msgKey: 'VIEW'
      }
      if (row['siscon'] != atob(sessionStorage.getItem(btoa('usr_of_siscon')))) {
        queryParams['other_branch'] = 'Y'
        queryParams['stm_siscon_code'] = row.siscon
        queryParams['stm_branch_code'] = row.branch
      }
      else{
        queryParams['other_branch'] = 'N'
        queryParams['stm_siscon_code'] = row.siscon
        queryParams['stm_branch_code'] = row.branch
      }
      sessionStorage.removeItem("navigateData");
      sessionStorage.setItem("navigateData", JSON.stringify(queryParams));
      window.open('session/entry/stock/stock-receipt/sr-view-page', '_blank'), { state: queryParams };
    }
  }

  loadData(row){
    
    this.lstPartyOrderRef = ConstantsServiceAvaxPro.lstPartyOrderRef    
    this.form.controls.cmbPartyOrderRef.setValue(row.ao_party_order_reference)

    if (row.ao_party_order_reference == 'VERBAL ORDER') {
      this.flgPartyOrderNo = false;
      this.flgOrderByName = true;
      this.form.controls.txtOrderByName.setValue(row.ao_cust_order_no);
    } else {
      this.flgPartyOrderNo = true;
      this.flgOrderByName = false;
      this.form.controls.txtPartyOrderNo.setValue(row.ao_cust_order_no);
    }

    this.form.controls.timeHrs.setValue(row.ordertime.split(":")[0]);
    this.form.controls.timeMin.setValue(row.ordertime.split(":")[1]);

    try {
      if (row.ao_ts_cust_order_no != '' && row.ao_ts_cust_order_no != null) {
        this.form.controls.dtPartyOrderDate.setValue(new Date(row.ao_ts_cust_order_no).toISOString());
      }
    }
    catch (e) {
      console.log('Date error')
    }
  
  }

  setOrderFlag() {
    let selectedValue = this.form.controls.cmbPartyOrderRef.value;
    if (selectedValue == 'WEB ORDER' || selectedValue == 'PURCHASE ORDER' || selectedValue == 'OTHERS') {
      this.flgPartyOrderNo = true;
      this.flgOrderByName = false;
    }
    else if (selectedValue == 'VERBAL ORDER') {
      this.flgOrderByName = true;
      this.flgPartyOrderNo = false;
    }
    else {
      this.flgPartyOrderNo = false;
      this.flgOrderByName = false;
    }
  }

  updatePartyOrderDetails(){

    let selectedValue1 = this.form.controls.cmbPartyOrderRef.value;
    if (selectedValue1 == null || selectedValue1 == undefined || selectedValue1 == '') {
      this.openSnackBar('Please select party order reference');
      return false;
    }
    let dtPartyOrderDate = this.form.controls.dtPartyOrderDate.value
    let aoaodate = this.rowData['ao_ao_date']

        if(dtPartyOrderDate == null || dtPartyOrderDate == undefined){
          this.openSnackBar("Please select party order Date");
          return false;          
        }
    
        let PartyOrderDate = this.utilityServiceAvaxPro.getFormattedDate(dtPartyOrderDate)
        let aodate = this.utilityServiceAvaxPro.getFormattedDate(aoaodate)

        // console.log(" p o d -- " + new Date(PartyOrderDate))
        // console.log(" a p o d -- " + new Date(aodate))

        let newPartyOrderDateFormat: any = PartyOrderDate.split("-")[1] + "/" + PartyOrderDate.split("-")[0] + "/" + PartyOrderDate.split("-")[2]
        let newaodateFormat: any = aodate.split("-")[1] + "/" + aodate.split("-")[0] + "/" + aodate.split("-")[2]
 
        // console.log(" p o d -- " + new Date(newPartyOrderDateFormat))
        // console.log(" a p o d -- " + new Date(newaodateFormat))
    
    // if (new Date(dtPartyOrderDate).getTime() > new Date(aoaodate).getTime()) {
      if (new Date(newPartyOrderDateFormat) > new Date(newaodateFormat)) {
      this.openSnackBar("Party order date should not be greater than document date");
      return false;
    }

    if(this.rowData['timeRequired'] == 'Y'){
      if(this.form.controls.timeHrs.value==null || this.form.controls.timeHrs.value==undefined ||this.form.controls.timeHrs.value==''
    || this.form.controls.timeMin.value==null || this.form.controls.timeMin.value==undefined ||this.form.controls.timeMin.value==''
    || (this.form.controls.timeHrs.value=='00' && this.form.controls.timeMin.value=='00')){
        this.openSnackBar("Please select Party Order Time");
        return false;
      }
    }

    let payload = {
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },
      ao_ao_no: this.rowData['ao_ao_no'],
      ao_siscon_code: this.rowData['ao_siscon_code'],
      ao_branch_code:this.rowData['ao_branch_code'],
      ao_cust_order_no: this.form.controls.txtPartyOrderNo.value,
      str_ao_ts_cust_order_no: this.utilityServiceAvaxPro.getFormattedDate(this.utilityServiceAvaxPro.date_ymd(this.form.controls.dtPartyOrderDate.value)) +" "+this.form.controls.timeHrs.value+":"+this.form.controls.timeMin.value+":00",
      ao_party_order_reference: this.form.controls.cmbPartyOrderRef.value == undefined ? '' : this.form.controls.cmbPartyOrderRef.value,
    }

    if (this.flgOrderByName) {
      payload['ao_cust_order_no'] = this.form.controls.txtOrderByName.value;
    }
    else if(this.flgOrderByName == false && this.flgPartyOrderNo == false){
      // Email Order , WhatsApp Order
      payload['ao_cust_order_no'] = this.form.controls.cmbPartyOrderRef.value;
    }

    console.log("payload - " , payload)
    this.dialogRef.close({'payload':payload})
  }


}
