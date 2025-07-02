import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppSettings } from 'src/app/app.settings';
import { MatSnackBar, DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { UtilityServiceAvaxPro } from 'src/app/core/services/utility/utility_avaxpro.service';
import { Router } from '@angular/router';
import { SpecialTaxListModel, PartyModel, HandledByModel, BrokerModel, DeliveryTermsModel, LookupModel } from '../../commons/commons.model';
import { debounceTime, tap, switchMap, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../commons/date-adapter/app-date-adapter.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { QuotationService } from '../quotation.service';
import { QuotTypeModel } from '../quotation.model';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-modify-header-page',
  templateUrl: './modify-header-page.component.html',
  styleUrls: ['./modify-header-page.component.scss', '../../entry.scss'],
  providers: [{
    //provide : DateAdapter,
    provide: DateAdapter, useClass: AppDateAdapter
  },
  { provide: DatePipe },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }],
})


//})

export class ModifyHeaderPageComponent implements OnInit {

  partyCode: string
  form: FormGroup = this.formBuilder.group({});
  payload: {}

  txtNoValidDays: number
  queryParams = {}

  todayDate = new Date();

  serializedDate1 = new FormControl((new Date()).toISOString());
  todayDate1 = new Date(new Date().setFullYear(new Date().getFullYear()));


  lstDelTerms: any
  lstSpecialTax: any

  lstSource: any

  lstQuotType: any
  lstSourcing: any
  lstType: any
  lstBroker: any

  csLists: PartyModel[] = new Array<PartyModel>()
  filteredCSLists: PartyModel[] = new Array<PartyModel>()
  filteredDispatchLists: PartyModel[] = new Array<PartyModel>()
  filteredSupplier: PartyModel[] = new Array<PartyModel>()

  lstHandledBy: any = []
  lstFollowedBy: any = []
  filteredHandledByLists: Observable<any>
  filteredFollowedByLists: Observable<any>
  filteredInstructedByLists: Observable<any>

  lstBillAddr: Observable<any>[] = []
  lstDispatchAddr: Observable<any>[] = []

  objBillAddress: Observable<any> = new Observable
  objDispatchAddress: Observable<any> = new Observable

  quotSourceFresh: string
  hideQuotSource: boolean = true;
  objDraftHeader: any



  constructor(
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<ModifyHeaderPageComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private router: Router,
    private quotationService: QuotationService,

  ) {

    this.form = this.formBuilder.group({
      cmbQTSource: ['',],
      hiddenDraftNo: ['',],
      cmbDeliveryTerms: [''],
      txtDeliveryDays: [''],
      txtNoValidDays: [''],
      cmtQtType: [''],
      txtEnqNo: [''],
      dtEnDate: new Date(),

      txtAttention: [''],
      txtDocCCTo: [''],
      txtDestination: [''],
      txtReference: [''],

      cmbSpecialTax: [''],
      txtBillTo: [''],
      txtDispatchTo: [''],

      cmbQTExciseExmpForm: [''],

      cmbBillToAddress: ['', [Validators.required]],
      cmbDispatchToAddress: ['', [Validators.required]],
      txtHandledBy: [''],
      txtFollowedBy: [''],
      txtInstructedBy: [''],
      cmbBroker: [''],
      cmbProject:['']
    })
  }

  ngOnInit() {
    this.quotSourceFresh = 'QT';
    this.hideQuotSource = true;
    this.txtNoValidDays = 3
    console.log('qt_quot_no', this.dialogData.qt_quot_no);
    this.getCompleteQuotHeaderDetails(this.dialogData.qt_quot_no, 'COMPLETE');
  }

  loadData() {
    this.getDeliveryTermsDropdown();
    this.getSource();
    this.getSpecialtax();
    this.getProjectList()
    //this.getParty('txtBillTo', 'C', 'B');
    //this.getParty('txtDispatchTo', 'C', 'D');


    this.getHandledByDropdown()
    this.filteredHandledByLists = this.form.get('txtHandledBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    this.filteredFollowedByLists = this.form.get('txtFollowedBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )
    this.filteredInstructedByLists = this.form.get('txtInstructedBy').valueChanges.pipe(
      startWith(''),
      map(value => {
        value =
          typeof value == 'string' || value instanceof String
            ? value
            : value.usr_name
        return this.filterHandledBy(value)
      })
    )

    this.getQuotType();

    this.form.get('cmtQtType').setValue(this.objDraftHeader.qt_type_code);
    this.form.controls.cmbSpecialTax.setValue(this.objDraftHeader.qt_tax_type_code);

    this.getBrokerList();
    this.form.controls['dtEnDate'].setValue(new Date(this.objDraftHeader.qt_enq_date).toISOString());

  }

  searchSelectedParty(txtid, party_flg, flg) {
    if (this.form.get(txtid).value == '' || this.form.get(txtid).value == null) {
      this.openSnackBar('Please Enter Party Code to procced  ');
      return false;
    } else if (this.form.get(txtid).value.length < 3) {
      this.openSnackBar('Please Enter More Then 2 Characters');
      return false;
    } else {
      this.utilityServiceAvaxPro.searchParty(this.form.get(txtid).value, party_flg, '').subscribe(
        data => {
          if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
            if (flg == 'B') {
              this.filteredCSLists = data.responseData[0].map(item => {
                return new PartyModel(item.cs_code, item.cs_name)
              })
            }
            else {
              this.filteredDispatchLists = data.responseData[0].map(item => {
                return new PartyModel(item.cs_code, item.cs_name)
              })

            }
          }
        },
      )
    }
  }

  lstProject:any=[]
  getProjectList() {
    let payload = {
      common_row:{siscon_code:atob(sessionStorage.getItem(btoa('usr_of_siscon'))),branch_code:atob(sessionStorage.getItem(btoa('usr_of_branch')))}
    }
    this.utilityServiceAvaxPro.getProjectList(payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstProject = data.responseData[0]
          //this.objDraftHeader.
          this.form.get('cmbProject').setValue(this.objDraftHeader.qt_project_code);
        }
      })
  }

  getCompleteQuotHeaderDetails(quotationNo, callfrom) {

    this.payload = {
      callFrom: callfrom,
      qt_quot_no: quotationNo,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },
    }
    this.quotationService.getCompleteQuotHeaderDetailsService(this.payload).toPromise()
      .then(
        data => {
          //this.objDraftHeader = data.responseData[0].QUOT_HEADER;
          this.objDraftHeader = data.responseData[0].quot_header;
          this.form.get('txtBillTo').setValue(
            new PartyModel(this.objDraftHeader.qt_cust_code, this.objDraftHeader.qt_bill_to_name));
          this.form.get('txtDispatchTo').setValue(
            new PartyModel(this.objDraftHeader.qt_disp_code, this.objDraftHeader.qt_disp_to_name));
          //calling following function bcz  default show address
          this.getPartyDetail(this.objDraftHeader.qt_cust_code, 'B', 'Y');
          this.getPartyDetail(this.objDraftHeader.qt_disp_code, 'D', 'Y');
          this.form.get('txtEnqNo').setValue(this.objDraftHeader.qt_enq_no);
          this.form.get('txtAttention').setValue(this.objDraftHeader.qt_attention);
          this.form.get('txtDocCCTo').setValue(this.objDraftHeader.qtccto);
          this.form.get('txtDestination').setValue(this.objDraftHeader.qt_destination);
          this.form.get('txtReference').setValue(this.objDraftHeader.qt_reference);
          this.form.get('cmbDeliveryTerms').setValue(this.objDraftHeader.qt_del_terms_code);
          this.form.get('txtNoValidDays').setValue(this.objDraftHeader.qt_valid_days);
          this.form.get('txtDeliveryDays').setValue(this.objDraftHeader.qt_delivery_days);

          this.loadData();
        }).catch(err => { });

  }

  getCcsPreferenceData(party_code, flg) {
    let data = {
      party_code: party_code,
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code')))
    }
    this.utilityServiceAvaxPro.getCcsPreferenceData(data).
    subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        if (data.responseData.length > 0) {
          
          if (flg == 'D') {
                    
            let save_dispatch_addr_code =  data.responseData[0].ccs_dispatch_addr_code
            let addrDisp : any;
            
           this.lstDispatchAddr.map(value => {                                
                  if(value['csad_addr_code'] == save_dispatch_addr_code
                  && value['csad_addr_code'] > 0){
                    addrDisp = value
                  }
                })
  
                if(addrDisp== null || addrDisp== undefined){
                  let addrDispFirst = this.lstDispatchAddr[0];
                  this.form.get('cmbDispatchToAddress').setValue(addrDispFirst);
                }else{
                  this.form.get('cmbDispatchToAddress').setValue(addrDisp);
                }
  
          }
          else {
  
            let save_billto_addr_code =  data.responseData[0].ccs_billto_addr_code
            let addrBillto : any;
            
           this.lstBillAddr.map(value => {                                
                  if(value['csad_addr_code'] == save_billto_addr_code
                  && value['csad_addr_code'] > 0){
                    addrBillto = value
                  }
                })
  
                if(addrBillto== null || addrBillto== undefined){
                  let addrBilltoFirst = this.lstBillAddr[0];
                  this.form.get('cmbBillToAddress').setValue(addrBilltoFirst);
                }else{
                  this.form.get('cmbBillToAddress').setValue(addrBillto);
                }
            
          }
  
        }
      }
    })
  }

  
  getPartyDetail(party_code, flg, flag?: string) {

    if (flag == 'Y') {
      this.partyCode = party_code;
    } else {
      this.partyCode = party_code.cs_code;
    }

    this.quotationService.getPartyDetail(this.partyCode).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (flg == 'B') {

            this.lstBillAddr = data.responseData[0];

            if (flag == 'Y') {
              let addrBillToFirst = data.responseData[0].find(({ csad_addr_code }) => csad_addr_code == this.objDraftHeader.qt_bill_addr_code);
              this.form.controls.cmbBillToAddress.setValue(addrBillToFirst);
            } else {
              // let objBillAddress = this.lstBillAddr[0]
              // this.form.controls.cmbBillToAddress.setValue(objBillAddress);
              
            this.getCcsPreferenceData(this.partyCode , 'B');
            
            }

          }
          else {

            this.lstDispatchAddr = data.responseData[0]

            if (flag == 'Y') {
              let addrDisToFirst = data.responseData[0].find(({ csad_addr_code }) => csad_addr_code == this.objDraftHeader.qt_disp_addr_code);
              console.log('addrDisToFirst = ', addrDisToFirst);
              this.form.controls.cmbDispatchToAddress.setValue(addrDisToFirst);
            } else {
              // let objDispAddress = this.lstDispatchAddr[0]
              // this.form.controls.cmbDispatchToAddress.setValue(objDispAddress);

              this.getCcsPreferenceData(this.partyCode , 'D');
            
            }

          }
          //console.log('lstBillAddr:',this.lstBillAddr)
        }
      })
  }

  displaycslist(value): string | undefined {
    return value ? value.cs_code + ' :: ' + value.cs_name : undefined
  }


  getBrokerList() {
    this.utilityServiceAvaxPro.getBrokerList().
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          let selectedObj;
          this.lstBroker = data.responseData[0].map(item => {

            if (this.objDraftHeader.qt_broker_code == item.brk_broker_code) {
              selectedObj = new BrokerModel(item.brk_broker_code, item.brk_broker_name)
              return selectedObj;
            }
            else {
              return new BrokerModel(item.brk_broker_code, item.brk_broker_name)
            }
          })

          this.form.get('cmbBroker').setValue(selectedObj);

        }
      })
  }



  getHandledByDropdown() {

    this.utilityServiceAvaxPro.getHandledByList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstHandledBy = data.responseData[0].map(item => {
            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
          })
        }

        let handledByObj = this.lstHandledBy.find(({ usr_userid }) => usr_userid
          == this.objDraftHeader.qt_handled_by);
        this.form.controls.txtHandledBy.setValue(handledByObj);
        let followedByObj = this.lstHandledBy.find(({ usr_userid }) => usr_userid
          == this.objDraftHeader.qt_follow_up_by);
        this.form.controls.txtFollowedBy.setValue(followedByObj);
        let instByObj = this.lstHandledBy.find(({ usr_userid }) => usr_userid
          == this.objDraftHeader.qt_instructed_by);
        this.form.controls.txtInstructedBy.setValue(instByObj);
        return this.lstHandledBy
      },
      error => {
        console.log(error)
      }
    )
  }
  filterHandledBy(val: string) {
    return this.lstHandledBy.filter(option => {
      return option.usr_name.toLowerCase().includes(val.toLowerCase())
    })
  }
  displayHandledBy(value): string | undefined {
    return value ? value.usr_name : undefined
  }


  getQuotType() {

    this.quotationService.getQuotType().
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {

          //this.lstQuotType = data.responseData[0].quotType.map(item => {
          this.lstQuotType = data.responseData[0].quottype.map(item => {
            return new QuotTypeModel(
              item.qty_code,
              item.qty_type

            )
          })
        }
      })

  }

  getSource() {
    this.quotationService.getSource('ao', 'source').
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstSource = data.responseData[0].map(item => {
            return new LookupModel(
              item.lkt_group,
              item.lkt_sub_group,
              item.lkt_code,
              item.lkt_desc,
              item.lkt_src_flg,
              item.lkt_por_to_print
            )
          })
        }
      })
  }


  getDeliveryTermsDropdown() {
    this.utilityServiceAvaxPro.getQuotDelTermsList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstDelTerms = data.responseData[0].map(item => {
            //return new DeliveryTermsModel(item.cdl_challan_del_code, item.cdl_desc)
            return new DeliveryTermsModel(item.dlt_del_terms_code, item.dlt_desc)
          })
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  getSpecialtax() {
    this.utilityServiceAvaxPro.getSpecialtax().
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstSpecialTax = data.responseData[0].map(item => {
            return new SpecialTaxListModel(
              item.spt_tax_code,
              item.spt_tax_flg,
              item.spt_desc,
              item.igst_code
            )
          })
        }
      })
  }

  getParty(txtid, flgCust, flg) {
    this.form.get(txtid).valueChanges.pipe(debounceTime(100), tap(() => {
      if (flg == 'B')
        this.filteredCSLists = new Array<PartyModel>()
      else if (flg == 'D')
        this.filteredDispatchLists = new Array<PartyModel>()
      else
        this.filteredSupplier = new Array<PartyModel>()
    }),
      switchMap(value => {
        value = typeof value == 'string' || value instanceof String ? value : value.cs_code || value.cs_name
        return value.length > 2 ? this.utilityServiceAvaxPro.searchParty(value, flgCust, '') : ['']
      })
    ).subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        if (flg == 'B') {
          this.filteredCSLists = data.responseData[0].map(item => {
            return new PartyModel(item.cs_code, item.cs_name)
          })

        }
        else if (flg == 'D') {
          this.filteredDispatchLists = data.responseData[0].map(item => {
            return new PartyModel(item.cs_code, item.cs_name)
          })
        }
        else {
          this.filteredSupplier = data.responseData[0].map(item => {
            return new PartyModel(item.cs_code, item.cs_name)
          })
        }
      }
      if (flg == 'B') {
        return this.filteredCSLists
      }
      else if (flg == 'D') {
        return this.filteredDispatchLists
      }
      else {
        return this.filteredSupplier
      }
    },
      error => {
        console.log(error)
      }
    )
  }


  getFormattedDate(res: any) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);
    return formattedDate
  }

  updateBillTo() {

    if (this.form.controls.txtDeliveryDays.value == "" || this.form.controls.txtDeliveryDays.value == null || this.form.controls.txtDeliveryDays.value == undefined) {
      this.openSnackBar("Please Enter Valid value for Delivery Period");
      return false;
  } else {
   
    if (!this.form.controls.txtDeliveryDays.value.match(/^([a-zA-Z0-9 ])+$/)) {
      this.openSnackBar("Delivery Period Should Be AlphaNumeric");
      return false;
    }
  }
    
    this.payload = {

      qt_cust_code: this.form.get('txtBillTo').value.cs_code,
      qt_disp_to_code: this.form.get('txtDispatchTo').value.cs_code,

      qt_bill_to_name: this.form.get('txtBillTo').value.cs_name,
      qt_disp_to_name: this.form.get('txtDispatchTo').value.cs_name,

      qt_enq_no: this.form.get('txtEnqNo').value,
      //qt_enq_date: this.form.get('dtEnDate').value,
      qt_enq_date: this.getFormattedDate(this.form.get('dtEnDate').value),
      //qt_quotation_date: this.form.get('dtQtDate').value,
      qt_attention: this.form.get('txtAttention').value,
      qt_ccto: this.form.get('txtDocCCTo').value,
      qt_destination: this.form.get('txtDestination').value,
      qt_reference: this.form.get('txtReference').value,
      qt_del_terms_code: this.form.get('cmbDeliveryTerms').value,
      qt_valid_days: this.form.get('txtNoValidDays').value,
      qt_delivery_days: this.form.get('txtDeliveryDays').value == "" ? '0' : this.form.get('txtDeliveryDays').value,
      qt_broker_code: this.form.get('cmbBroker').value == '' ||
        this.form.get('cmbBroker').value == undefined ||
        this.form.get('cmbBroker').value == null ? '' : this.form.get('cmbBroker').value.brk_broker_code,
      //callFrom: callfrom,
      qt_quot_no: this.dialogData.qt_quot_no,
      qt_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
      qt_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
      qt_bill_addr_code: this.form.controls.cmbBillToAddress.value.csad_addr_code,
      qt_disp_addr_code: this.form.controls.cmbDispatchToAddress.value.csad_addr_code,
      qt_handled_by: this.form.controls.txtHandledBy.value.usr_userid,
      qt_follow_up_by: this.form.controls.txtFollowedBy.value.usr_userid,
      qt_instructed_by: this.form.controls.txtInstructedBy.value.usr_userid,
      qt_edited_by: atob(sessionStorage.getItem(btoa('userId'))),
      qt_project_code: this.form.controls.cmbProject.value,

      qt_tax_type_code: this.form.controls.cmbSpecialTax.value,
      qt_spl_tax_flg: this.form.controls.cmbSpecialTax.value == '' ||
        this.form.controls.cmbSpecialTax.value == null ||
        this.form.controls.cmbSpecialTax.value == undefined ? 'N' : 'Y',


      userInformationDto: {
        usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
        usr_name: atob(sessionStorage.getItem(btoa('username'))),
        fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
        fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
        fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
        usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
        usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
        usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
        usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
      },
    }


    console.log('payload update other info = ', this.payload);
    this.utilityServiceAvaxPro.checkParty(this.form.get('txtBillTo').value.cs_code+"::"+this.form.get('txtDispatchTo').value.cs_code).subscribe(data=>{
      if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
        this.openSnackBar(data.message)
        return false;
      }else{
        this.quotationService.modifyPartyDetails(this.payload).subscribe(
          data => {
            this.openSnackBar(data.responseData[0][1]);
            if (data.responseData[0][0] == "Y") {
              //this.closeDialog("Y");
              let jsonObj = {}
              jsonObj["docNo"] = this.dialogData.qt_quot_no;
              jsonObj["qt_quot_no"] = this.dialogData.qt_quot_no;
              jsonObj["isFromPendingDraft"] = "N";
              jsonObj["callFrom"] = "COMPLETE";
              jsonObj["isForViewQuotation"] = "Y";
              jsonObj["userInformationDto"] = {
                usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
                usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
                usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
                usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
              }
              sessionStorage.removeItem("data");
              sessionStorage.setItem("stateData", JSON.stringify(jsonObj));
              this.router.navigate(['session/entry/quotation/quotview'], { state: jsonObj });
            }
          });
        }
    })
  }

  saveCcsPreferenceData(flg) {
    this.payload = {
      company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
      user_preference_flg:flg
    }
    if(flg =='billtoaddr'){
      if (this.form.controls.txtBillTo.value == undefined ||
        this.form.controls.txtBillTo.value == "" ||
        this.form.controls.txtBillTo.value == null
      ) {
        this.openSnackBar("Please select Bill To");
        return false;
      }
      if (this.form.controls.cmbBillToAddress.value == undefined ||
        this.form.controls.cmbBillToAddress.value == "" ||
        this.form.controls.cmbBillToAddress.value == null
      ) {
        this.openSnackBar("Please select Bill To Address");
        return false;
      }
      this.payload['ccs_billto_addr_code']=this.form.controls.cmbBillToAddress.value.csad_addr_code
      this.payload['party_code']=this.form.controls.txtBillTo.value.cs_code

    }
    else if(flg =='dispachtoaddr'){
      if (this.form.controls.txtDispatchTo.value == undefined ||
        this.form.controls.txtDispatchTo.value == "" ||
        this.form.controls.txtDispatchTo.value == null
      ) {
        this.openSnackBar("Please select Dispatch To");
        return false;
      }
      if (this.form.controls.cmbDispatchToAddress.value == undefined ||
        this.form.controls.cmbDispatchToAddress.value == "" ||
        this.form.controls.cmbDispatchToAddress.value == null
      ) {
        this.openSnackBar("Please select Dispatch To Address  ");
        return false;
      }
      this.payload['ccs_dispatch_addr_code']=this.form.controls.cmbDispatchToAddress.value.csad_addr_code
      this.payload['party_code']=this.form.controls.txtDispatchTo.value.cs_code
    }

    this.utilityServiceAvaxPro.saveCcsPreference(this.payload).
    subscribe(data => {
      if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
        console.log(" Successfully saveCcsPreferenceData")
      }
    })
  
  }

  closeDialog(val) {
    this.dialogRef.close(val);
  }

  openSnackBar(message) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 1000,
    });
  }

}



