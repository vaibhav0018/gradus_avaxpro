import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilityServiceAvaxPro } from '../../../../../../core/services/utility/utility_avaxpro.service';
import { Router } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../commons/date-adapter/app-date-adapter.service';
import { LookupModel, DeliveryTermsModel, SpecialTaxListModel, PartyModel, HandledByModel, BrokerModel } from '../../../commons/commons.model';
import { QuotationService } from '../../quotation.service';
import { debounceTime, tap, switchMap, startWith, map } from 'rxjs/operators';
import { QuotTypeModel } from '../../quotation.model';
import { Observable } from 'rxjs';
import { SnackbarComponent } from '../../../snackbar/snackbar/snackbar.component';
import { QuotationPageList } from './constants';
import { MiscPartyMaintenanceMenuComponent } from '../../../../master/customer-master-draft/components/misc-party-maintenance-menu/misc-party-maintenance-menu.component';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-add-new-quotation-filter',
  templateUrl: './add-new-quotation-filter.component.html',
  styleUrls: ['./add-new-quotation-filter.component.scss', '../../../entry.scss'],
  providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
  { provide: DatePipe },
  { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }],
  standalone: false
})

export class AddNewQuotationFilterComponent implements OnInit {

  queryParams = {}
  payload = {}
  form: FormGroup = this.formBuilder.group({});
  todayDate = new Date();
  todayDate1 = new Date();
  lstDelTerms: any
  lstSpecialTax: any

  dtQtDate = new FormControl(new Date());
  serializedDate1 = new FormControl((new Date()).toISOString());
  lstSource: any
  lstInvType: any

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

  lstProject : any=[]
  quotSourceFresh: string
  hideQuotSource: boolean = true;

  controlValue = new Date(atob(sessionStorage.getItem(btoa('fin_year_beg'))||""))
  minDate = new Date(this.controlValue.getFullYear(), 3, 1);
  maxDate = new Date(this.controlValue.getFullYear() + 1, 2, 31);

  toSelectedDelCode: any
  def_qt_delivery: any
  stateDataStr: string;
  miscPartyData: any;

  constructor(
    private formBuilder: FormBuilder,
    private utilityServiceAvaxPro: UtilityServiceAvaxPro,
    private quotationService: QuotationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {

    this.form = this.formBuilder.group({
      cmbQTSource: ['',],
      hiddenDraftNo: ['',],
      dtQtDate: [''],
      cmbDeliveryTerms: [''],
      txtDeliveryDays: [''],
      txtNoValidDays: [''],
      cmtQtType: [''],
      txtEnqNo: [''],
      dtEnDate: [''],
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

    let fin_end_dt = atob(sessionStorage.getItem(btoa('fin_year_end')) ||"")
    let endDate: any = fin_end_dt.split("/")[1] + "/" + fin_end_dt.split("/")[0] + "/" + fin_end_dt.split("/")[2]

    if (new Date(this.todayDate) > new Date(endDate)) {
      this.todayDate = new Date(endDate)
    } else {
      this.todayDate = new Date()
    }

    this.quotSourceFresh = 'QT';
    this.form.controls.txtNoValidDays.setValue("3");

    this.getDeliveryTermsDropdown();
    this.getInvoiceType();
    this.getSource('D');
    this.getSpecialtax();
    this.getBrokerList();
    this.getQuotType();
    this.getProjectList()

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

  }

  getBrokerList() {
    this.utilityServiceAvaxPro.getBrokerList().
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstBroker = data.responseData[0].map(item => {
            return new BrokerModel(
              item.brk_broker_code,
              item.brk_broker_name
            )
          })
        }
      })
  }

  getHandledByDropdown() {

    this.utilityServiceAvaxPro.getHandledByList().subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstHandledBy = data.responseData[0].map(item => {
            if (item.usr_userid == atob(sessionStorage.getItem(btoa('userId')))) {
              this.form.get('txtHandledBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
              this.form.get('txtFollowedBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
              this.form.get('txtInstructedBy').setValue(new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code));
            }
            return new HandledByModel(item.usr_userid, item.usr_name, item.usr_acc_code)
          })
        }
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

    this.quotationService.getQuotType().subscribe(data => {
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

  getSource(flg) {
    this.quotationService.getSource('ao', 'source').
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (flg == 'D') {
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
        }
      })
  }


  getInvoiceType() {
    this.quotationService.getSource('ao', 'type').
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstInvType = data.responseData[0].map(item => {
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
            return new DeliveryTermsModel(item.dlt_del_terms_code, item.dlt_desc)
          })

          if(data.responseData[1]!=""){
            this.toSelectedDelCode = data.responseData[1]
          }
          else{
            let usrBrCode = atob(sessionStorage.getItem(btoa('usr_of_branch')))
            let key: any = 'qt_delivery_' + usrBrCode
            this.def_qt_delivery = QuotationPageList[key].description_key
            if (this.def_qt_delivery != null) {
              this.toSelectedDelCode = this.def_qt_delivery
            }  
          }
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

  getProjectList() {
    let payload = {
      common_row:{siscon_code:atob(sessionStorage.getItem(btoa('usr_of_siscon'))),branch_code:atob(sessionStorage.getItem(btoa('usr_of_branch')))}
    }
    this.utilityServiceAvaxPro.getProjectList(payload).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.lstProject = data.responseData[0]
        }
      })
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
          else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
            this.openSnackBar(data.message);
            return false;
          }
        },
      )
    }
  }

  getParty(txtid, flgCust, flg) {
    this.form.get(txtid).valueChanges.pipe(debounceTime(100), tap(() => {
      if (flg == 'B') {
        this.filteredCSLists = new Array<PartyModel>()
      }
      else if (flg == 'D') {

        this.filteredDispatchLists = new Array<PartyModel>()

        this.filteredCSLists = new Array<PartyModel>()

      } else {
        this.filteredSupplier = new Array<PartyModel>()
      }
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

          this.filteredCSLists = data.responseData[0].map(item => {
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

  getPartyDetail(party_code, flg) {

    this.quotationService.getPartyDetail(party_code.cs_code).
      subscribe(data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          if (flg == 'D') {
            // this.lstBillAddr = data.responseData[0];
            // let addrFirst = this.lstBillAddr[0];
            // this.form.get('cmbBillToAddress').setValue(addrFirst);

            // this.lstDispatchAddr = data.responseData[0];
            // let addrDispFirst = this.lstDispatchAddr[0];
            // this.form.get('cmbDispatchToAddress').setValue(addrDispFirst);

            this.lstDispatchAddr = data.responseData[0];
            this.getCcsPreferenceData(party_code.cs_code , 'D');

          }
          else {
            // this.lstBillAddr = data.responseData[0];
            // let addrFirst = this.lstBillAddr[0];
            // this.form.get('cmbBillToAddress').setValue(addrFirst);

            // this.lstDispatchAddr = data.responseData[0];
            // let addrDispFirst = this.lstDispatchAddr[0];
            // this.form.get('cmbDispatchToAddress').setValue(addrDispFirst);

            this.lstBillAddr = data.responseData[0];
            this.getCcsPreferenceData(party_code.cs_code, 'B');


          }
        }
        else if (data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);
          return false;
        }
      })
  }

  displaycslist(value): string | undefined {
    return value ? value.cs_code + ' :: ' + value.cs_name : undefined
  }

  selectBillTo() {
    this.getPartyDetail(this.form.get('txtBillTo').value, 'B')
    this.filteredDispatchLists[0] = this.filteredCSLists[0]
    this.form.get('txtDispatchTo').setValue(this.form.get('txtBillTo').value)
    this.getPartyDetail(this.form.get('txtDispatchTo').value, 'D')
  }

  selectDispatchTo() {
    this.getPartyDetail(this.form.get('txtDispatchTo').value, 'D')
  }

  setPartyDetail(flg) {
    // this.hideQuotSource =false
  }
  setQuotDetail(flg) {

  }

  resetSplTax() {
    this.form.controls.cmbSpecialTax.setValue("");
  }

  openSnackBar(message) {
    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   data: message,
    //   duration: 10000
    // });
    UtilityServiceAvaxPro.showErrMessage(this.snackBar,message)
  }

  newQuotItemEntryPage() {

    if (isNaN(this.form.controls.txtNoValidDays.value)) {
      this.openSnackBar("Please Enter Valid No Of Valid Days.");
      return false;
    }

    if (this.form.controls.txtDeliveryDays.value == "" || this.form.controls.txtDeliveryDays.value == null || this.form.controls.txtDeliveryDays.value == undefined) {
        this.openSnackBar("Please Enter Valid value for Delivery Period");
        return false;
    } else {
      /* if (isNaN(this.form.controls.txtDeliveryDays.value)) {
        this.openSnackBar("Please Enter Valid Delivery Days / Weeks.");
        return false;
      } */

      if (!this.form.controls.txtDeliveryDays.value.match(/^([a-zA-Z0-9 ])+$/)) {
        this.openSnackBar("Delivery Period Should Be AlphaNumeric");
        return false;
      }
    }

    this.queryParams = this.form.value
    this.queryParams["qt_draft_no"] = "NEW"
    this.queryParams["qt_inv_type_code"] = "-"
    this.queryParams["qt_inv_type_code_desc"] = "-"
    this.queryParams["qt_doc_type_code"] = "QOT"
    this.queryParams["qt_source_type"] = 'FR'
    this.queryParams["qt_draft_date"] = this.utilityServiceAvaxPro.getFormatDate(this.form.controls.dtQtDate.value, 'yyyy-MM-dd'),
      // this.queryParams["qt_draft_date"] = this.getFormattedDate(this.form.controls.dtQtDate.value);
      this.queryParams["qt_del_terms_code"] = this.form.controls.cmbDeliveryTerms.value
    this.queryParams["qt_delivery_days"] = this.form.controls.txtDeliveryDays.value
    this.queryParams["qt_valid_days"] = this.form.controls.txtNoValidDays.value
    this.queryParams["qt_type"] = this.form.controls.cmtQtType.value
    this.queryParams["qt_enq_no"] = this.form.controls.txtEnqNo.value

    this.queryParams["qt_enq_date"] = this.getFormattedDate(this.form.controls.dtEnDate.value);

    this.queryParams["qt_attention"] = this.form.controls.txtAttention.value
    this.queryParams["qt_ccto"] = this.form.controls.txtDocCCTo.value
    this.queryParams["qt_destination"] = this.form.controls.txtDestination.value
    this.queryParams["qt_reference"] = this.form.controls.txtReference.value
    this.queryParams["qt_tax_type_code"] = this.form.controls.cmbSpecialTax.value
    this.queryParams["qt_spl_tax_flg"] = this.form.controls.cmbSpecialTax.value == '' || this.form.controls.cmbSpecialTax.value == null ||
      this.form.controls.cmbSpecialTax.value == undefined ? 'N' : 'Y'
    this.queryParams["qt_cust_code"] = this.form.controls.txtBillTo.value.cs_code
    this.queryParams["qt_cust_code_name"] = this.form.controls.txtBillTo.value.cs_name
    this.queryParams["qt_disp_to_code"] = this.form.controls.txtDispatchTo.value.cs_code
    this.queryParams["qt_disp_to_code_name"] = this.form.controls.txtDispatchTo.value.cs_name
    this.queryParams["qt_bill_addr_code"] = this.form.controls.cmbBillToAddress.value.csad_addr_code
    this.queryParams["qt_disp_addr_code"] = this.form.controls.cmbDispatchToAddress.value.csad_addr_code
    this.queryParams["qt_disp_state_code"] = this.form.controls.cmbDispatchToAddress.value.st_state
    this.queryParams["qt_handled_by"] = this.form.controls.txtHandledBy.value.usr_userid
    this.queryParams["qt_handled_by_name"] = this.form.controls.txtHandledBy.value.usr_name
    this.queryParams["qt_follow_up_by"] = this.form.controls.txtFollowedBy.value.usr_userid
    this.queryParams["qt_followed_by_name"] = this.form.controls.txtFollowedBy.value.usr_name
    this.queryParams["qt_instructed_by"] = this.form.controls.txtInstructedBy.value.usr_userid
    this.queryParams["qt_instructed_by_name"] = this.form.controls.txtInstructedBy.value.usr_name
    this.queryParams["qt_broker_code"] = this.form.controls.cmbBroker.value.brk_broker_code
    this.queryParams["qt_broker_by_name"] = this.form.controls.cmbBroker.value.brk_broker_name
    this.queryParams["qt_created_by"] = atob(sessionStorage.getItem(btoa('userId')))
    this.queryParams["qt_siscon_code"] = atob(sessionStorage.getItem(btoa('usr_of_siscon')))
    this.queryParams["qt_branch_code"] = atob(sessionStorage.getItem(btoa('usr_of_branch')))
    this.queryParams["qt_company_code"] = atob(sessionStorage.getItem(btoa('usr_company_code')))
    this.queryParams["qt_deleted_flg"] = "N"

    if (this.form.controls.txtDeliveryDays.value == '') {
      this.queryParams['qt_delivery_days'] = '0'
    }

    this.queryParams["callFrom"] = "Draft";
    this.queryParams["isFromPendingDraft"] = "Y";
    this.queryParams["isForViewQuotation"] = "N";
    this.queryParams["revisionFlag"] = "N";
    this.queryParams["qt_project_code"] = this.form.controls.cmbProject.value;

    this.payload = {

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
      qt_cust_code: this.form.controls.txtBillTo.value.cs_code,
      qt_bill_addr_code: this.form.controls.cmbBillToAddress.value.csad_addr_code,
      qt_disp_to_code: this.form.controls.txtDispatchTo.value.cs_code,
    }
    this.utilityServiceAvaxPro.checkParty(this.form.controls.txtBillTo.value.cs_code+"::"+this.form.controls.txtDispatchTo.value.cs_code).subscribe(data=>{
      if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
        this.openSnackBar(data.message);
        return false;
      } else {
        this.quotationService.getQuoatationNewDraftData(this.payload).toPromise().then(data => {
          this.queryParams["qt_inv_type_code"] = data.responseData[0].qt_inv_type_code
          this.queryParams["qt_inv_type_code_desc"] = data.responseData[0].qt_inv_type_code_desc

          sessionStorage.removeItem("data");
          sessionStorage.setItem("stateData", JSON.stringify(this.queryParams));
          this.router.navigate(['session/entry/quotation/newquotdraftitementry'], { state: this.queryParams });
        })
          .catch(err => {
          });
        }
    })
  }

  // call misc master program
  addNewMiscParty() {
    let data = {
      callFrom: 'quotation'
    }
    sessionStorage.removeItem("stateData");
    sessionStorage.removeItem("refData");

    localStorage.setItem('moduleCallFrom', JSON.stringify(data));
    const dialogRef = this.dialog.open(MiscPartyMaintenanceMenuComponent, {
      width: '90%',
      minWidth: '90%',
      height: '80%',
      maxHeight: '200vh',
    });
    dialogRef.afterClosed().subscribe(item => {
      if (sessionStorage.refData)
        this.stateDataStr = sessionStorage.getItem("refData");
      else {
        this.stateDataStr = sessionStorage.getItem("stateData");
        sessionStorage.removeItem("stateData");
        sessionStorage.setItem("refData", this.stateDataStr);
      }

      this.miscPartyData = JSON.parse(this.stateDataStr)
      if (this.miscPartyData == null || this.miscPartyData == "" || this.miscPartyData == undefined) {
      } else {
        this.searchSelectedParty1(this.miscPartyData.cust_supplr_code, 'CM');
      }
    });

  }

  searchSelectedParty1(party_code, party_flg) {
    this.utilityServiceAvaxPro.searchParty(party_code, party_flg, '').subscribe(
      data => {
        if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
          this.filteredCSLists = data.responseData[0].map(item => {
            return new PartyModel(item.cs_code, item.cs_name)
          })
          this.filteredDispatchLists = data.responseData[0].map(item => {
            return new PartyModel(item.cs_code, item.cs_name)
          })
          this.form.get('txtBillTo').setValue(this.filteredCSLists[0])
          this.getPartyDetail(this.form.get('txtBillTo').value, 'B')
          this.form.get('txtDispatchTo').setValue(this.filteredDispatchLists[0])
          this.getPartyDetail(this.form.get('txtDispatchTo').value, 'D')
        }
        else if(data.responseStatus === 'FAILURE' && data.responseCode === 'RES_109') {
          this.openSnackBar(data.message);
          return false;
        }
      },
    )
  }

  ngOnDestroy() {
    sessionStorage.removeItem("refData");
  }

  getFormattedDate(res: any) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(res, format, locale);
    return formattedDate
  }

  saveCcsPreferenceData(flg) {
    this.payload = {
      // party_code: this.dialogData.qt_cust_code,
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

}

