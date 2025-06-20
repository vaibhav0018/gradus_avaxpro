// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { ConstantsService } from '../../../../../../core/services/constants.service';
// import { CustomerMasterService } from '../../customer-master.service';
// import { QuotationModel } from '../../customer-master.model';
// import { EntryService } from '../../../../entry/entry.service';
// import { Router } from '@angular/router';
// import { FileUploadService } from 'src/app/core/services/file-upload.service';
// import * as fileSaver from 'file-saver';
// import { MenuModel, CommonColumnModel, PartyModel } from '../../customer-master.model';
// import { UtilityServiceAvaxPro } from '../../../../../../core/services/utility/utility_avaxpro.service';
// import { UtilityService } from '../../../../../../core/services/utility/utility.service';
// import { UserRightsModel } from '../../../../../../shared/models/model/user-rights.model';

// @Component({
//   selector: 'app-customer-draft-menu',
//   templateUrl: './customer-draft-menu.component.html',
//   styleUrls: ['./customer-draft-menu.component.scss']
// })

// export class CustomerDraftMenuComponent implements OnInit {
//   form: FormGroup
//   PAGE_SIZE_ARRAY = ConstantsService.PAGE_SIZE_ARRAY
//   loading: boolean = false
//   dataSource: any;
//   tableData: QuotationModel[] = []
//   message: any
//   showUploadExcelFlg: boolean = false;
//   showCustListFlag: boolean = true

//   uploadResponse: any;
//   @ViewChild(MatPaginator) paginator: MatPaginator
//   @ViewChild(MatSort) sort: MatSort
//   pageNumber: number = 1
//   pageSize: number = 15
//   navigateData = {}

//   MenudisplayedColumns: string[] = ['rn', 'cust_code', 'cust_name', 'cust_date', 'hand_by', 'select']
//   MenudataSource: any
//   MenutableData: any

//   lstColumn: CommonColumnModel[] = [
//     { col_name: 'SR NO', db_col: 'rn', flgLink: false, col_type: 'TXT' },
//     { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'TXT' },
//     { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//     { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//     { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//     { col_name: 'SELECT', db_col: 'select', flgLink: true, col_type: 'SELECT' },
//   ];
//   queryParams: any = {};
//   fileData: File;
//   invalidFields: any
//   mandatoryFields: any
//   partyList: any = []
//   userRightsList: UserRightsModel
//   flgAddRights: boolean = false
//   flgModifyRights: boolean = false
//   flgViewCustRights: boolean = false
//   flgAuthCustRights: boolean = false
//   flgAllowWoEmail:boolean= false;
//   addPageId = "addcustomer";
//   modifyPageId = "modifycustomer";
//   viewCustPageId = "viewcustomer";
//   allowEmailWoVerifyFlg:boolean[] = [];

//   accountsData:  any[]
//   accountsDisplayedColumns: any[] = ['cs_cust_supplr_code', 'cs_name', 'grp_code', 'grp_name']
//   showAccountsDataTable: boolean = false
//   custCodeAry: any[] = []

//   constructor(
//     private snackBar: MatSnackBar,
//     private formBuilder: FormBuilder,
//     private customerMasterService: CustomerMasterService,
//     private entryService: EntryService,
//     private router: Router,
//     private fileUploadService: FileUploadService,
//     private utilityServiceAvaxPro: UtilityServiceAvaxPro,
//     private utilityService: UtilityService
//   ) {
//     this.form = this.formBuilder.group({
//       txtFilter: [''],
//       txtCommFilter: [''],

//       txtPartyCode: [''],
//       cmbParty: [''],

//       txtPanNo: [''],
//       radCustType: [''],
//       selectedValue: ['']
//     })
//   }

//   ngOnInit() {
//     this.form.controls.txtFilter.setValue('');
//     this.form.controls.txtCommFilter.setValue('');

//     /*this.getHandledByUserRights(this.addPageId, atob(sessionStorage.getItem(btoa('userId'))))
//     this.getHandledByUserRights(this.modifyPageId, atob(sessionStorage.getItem(btoa('userId'))))
//     this.getHandledByUserRights(this.viewCustPageId, atob(sessionStorage.getItem(btoa('userId'))))
//     this.getSupVendList(this.pageNumber, this.pageSize, 'customer');
//     */
//     this.getSupVendList(this.pageNumber, this.pageSize, 'customer');
//     this.getRights();
//   }

//   ngOnDestroy() {
//     sessionStorage.removeItem("refData");
//   }

//   navigate(tab : any) {
//     // console.log(tab.index, ' Index')

//     this.form.controls.txtFilter.setValue('');
//     this.form.controls.txtCommFilter.setValue('');

//     if (tab.index == '0') {
//       this.getSupVendList(this.pageNumber, this.pageSize, 'customer')
//       if (this.flgModifyRights == false && this.flgViewCustRights == false) {
//         this.MenudisplayedColumns = ['cust_code', 'cust_name', 'cust_date', 'hand_by']
//         this.lstColumn = [
//           { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'DATE' },
//           { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//           { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//           { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//         ];
//       }
//     }
//     else if (tab.index == '1') {
//       this.getDraftList(1, this.PAGE_SIZE_ARRAY[0]);
//       this.showUploadExcelFlg = false;
//       this.showCustListFlag = true;
//       if (this.flgModifyRights == false && this.flgViewCustRights == false) {
//         this.MenudisplayedColumns = ['cust_code', 'cust_name', 'cust_date', 'hand_by']
//         this.lstColumn = [
//           { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'DATE' },
//           { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//           { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//           { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//         ];
//       }
//       if (this.flgAuthCustRights == true) {
//         this.MenudisplayedColumns = ['cust_code', 'cust_name', 'cust_date', 'hand_by', 'select']
//         this.lstColumn = [
//           { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'DATE' },
//           { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//           { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//           { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//           { col_name: 'SELECT', db_col: 'select', flgLink: true, col_type: 'SELECT' },
//         ];
//       }
//     }
//     else if (tab.index == '2') {
//       this.getSupVendList(this.pageNumber, this.pageSize, 'miscparty')
//       if (this.flgModifyRights == false && this.flgViewCustRights == false) {
//         this.MenudisplayedColumns = ['cust_code', 'cust_name', 'cust_date', 'hand_by']
//         this.lstColumn = [
//           { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'DATE' },
//           { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//           { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//           { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//         ];
//       }

//     }
//     else if (tab.index == '3') {
//       this.getSupVendList(this.pageNumber, this.pageSize, 'supplier')
//       if (this.flgModifyRights == false && this.flgViewCustRights == false) {
//         this.MenudisplayedColumns = ['cust_code', 'cust_name', 'cust_date', 'hand_by']
//         this.lstColumn = [
//           { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'DATE' },
//           { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//           { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//           { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//         ];
//       }
//     }
//     else if (tab.index == '4') {
//       this.getSupVendList(this.pageNumber, this.pageSize, 'vendor')
//       if (this.flgModifyRights == false && this.flgViewCustRights == false) {
//         this.MenudisplayedColumns = ['cust_code', 'cust_name', 'cust_date', 'hand_by']
//         this.lstColumn = [
//           { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'DATE' },
//           { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//           { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//           { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//         ];
//       }
//     }
//   }

//   getDraftList(pageNumber: number, pageSize: number, sortOrder? : any, sortBy? : any) {
//         this.customerMasterService.getDraftList(sortBy, sortOrder, pageNumber, pageSize)
//           .subscribe({
//             next: (data: any) => {
//               if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//                 if (data.responseData[0].length > 0) {
//                   this.dataSource = data.responseData[0];
//                   this.tableData = data.responseData[0];
//                   this.dataSource = new MatTableDataSource(this.tableData);
//                   this.dataSource.sort = this.sort;
//                 } else {
//                   this.message = this.entryService.showMsg('error');
//                 }
//               }
//             },
//             error: (err: any) => {
//               this.loading = false;
//               console.error(err);
//             }
//           });
//   }

//   get displayedColumns(): string[] {
//     const displayedColumns = this.lstColumn
//       .map(column => column.db_col)
//     return displayedColumns
//   }

//   newCustDraftMaster() {
//     this.router.navigate(['session/master/customer-draft-master/addnewcustdraft'])
//   }

//   newSupplierDraftMaster() {
//     this.router.navigate(['session/master/customer-draft-master/supplier'])
//   }

//   newVendorDraftMaster() {
//     this.router.navigate(['session/master/customer-draft-master/vendor'])
//   }

//   newMiscPartyMaster() {
//     let data = {
//       callFrom: 'misc_paty'
//     }
//     localStorage.setItem('moduleCallFrom', JSON.stringify(data));
//     this.router.navigate(['session/master/customer-draft-master/miscparty'])
//   }

//   editCustDraft(row: any,isForViewFlg : any) {
//     let data = {
//       cust_supplr_code: row.cd_cust_draft_code,
//       cust_supplr_name: row.cd_name,
//       flgModify: "Y",
//       flgDraft: 'Y',
//       flgAuthorize: 'N',
//       cs_authorised: row.cs_authorised,
//       flgModifyRights: this.flgModifyRights,
//       flgAddRights: this.flgAddRights,
//       flgViewCustRights: this.flgViewCustRights,
//       isForViewFlg: isForViewFlg,
//       flgAuthCustRights:this.flgAuthCustRights,
//       userInformationDto: {
//         usr_userid: atob(sessionStorage.getItem(btoa('userId')) ?? ''),
//         usr_name: atob(sessionStorage.getItem(btoa('username')) ?? ''),
//         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) ?? ''),
//         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) ?? ''),
//         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) ?? ''),
//         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) ?? ''),
//         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
//         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
//         usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) ?? ''),
//         usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) ?? ''),
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) ?? ''),
//       },
//     }
//     sessionStorage.setItem("stateData", JSON.stringify(data));
//     this.router.navigate(['/session/master/customer-draft-master/addnewcustdraft'], { state: data });
//   }

//   deleteCustDraft(row: any) {
//     this.queryParams = row;
//     this.queryParams["userInformationDto"] = {
//       usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ""),
//       usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ""),
//       usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ""),
//     }

//     this.customerMasterService.deleteDraft(this.queryParams).toPromise().then(data => {
//       // console.log('delete status = ', data.responseData[0]);
//       this.openSnackBar(data.responseData[0]);
//       this.getDraftList(1, this.PAGE_SIZE_ARRAY[0])
//     })
//       .catch(err => {
//       });
//   }

//   authoriseCustDraft(row: any,isForViewFlg: any) {
//     let data = {
//       cust_supplr_code: row.cd_cust_draft_code,
//       cust_supplr_name: row.cd_name,
//       flgModify: "Y",
//       flgDraft: 'Y',
//       flgAuthorize: 'Y',
//       cs_authorised: row.cs_authorised,
//       flgModifyRights: this.flgModifyRights,
//       flgAddRights: this.flgAddRights,
//       flgViewCustRights: this.flgViewCustRights,
//       isForViewFlg: isForViewFlg,
//       flgAuthCustRights:this.flgAuthCustRights,
//       userInformationDto: {
//         usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
//         usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
//         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
//         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
//         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
//         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
//         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
//         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
//         usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
//         usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
//       },
//     }
//     sessionStorage.setItem("stateData", JSON.stringify(data));
//     this.router.navigate(['/session/master/customer-draft-master/addnewcustdraft'], { state: data });
//   }

//   downloadDraftTemplate() {
//     const formData = new FormData();

//     formData.append('docBranch', atob(sessionStorage.getItem(btoa('usr_of_branch')) ||""));
//     formData.append('docSiscon', atob(sessionStorage.getItem(btoa('usr_of_siscon')) ||""));
//     formData.append('docCompany', atob(sessionStorage.getItem(btoa('usr_company_code')) ||""));
//     formData.append('docUserid', atob(sessionStorage.getItem(btoa('userId')) ||""));
//     formData.append('docNo', 'CUSTDRAFTTEMPLATE');
//     formData.append('docType', "PQ");

//     formData.append('docName', "new_customer_template_01.xls");
//     formData.append('docFileName', "new_customer_template_01.xls");

//     this.fileUploadService.downloadFile(formData).toPromise().then((res: any) => this.uploadResponse = res,).finally().then
//       (() => {
//         const blob = new Blob([this.uploadResponse], { type: 'application/octet-stream' });
//         fileSaver.saveAs(blob, "new_customer_template_01.xls");
//       }
//       )
//   }

//   showUploadExcelDiv() {
//     this.showUploadExcelFlg = true;
//     this.showCustListFlag = false
//   }

//   getSupVendList(pageNumber: any, pageSize : any, flg: any) {
//     this.customerMasterService.getSupVendList(pageNumber, pageSize, flg).subscribe((data : any) => {
//       this.message = ""
//       if (data.responseData[0].length == 0) {
//         this.message = this.entryService.showMsg('error')
//         this.MenudataSource = null
//         return false;
//       } else {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.MenutableData = data.responseData[0].map((item : any) => {
//             // console.log(item.rn, '  item.rn ')
//             return new MenuModel(
//               item.cd_cust_draft_code,
//               item.cd_name,
//               item.cd_ts_created,
//               item.usr_name,
//               item.cs_authorised,
//               item.rn,
//               item.gstflg,
//               item.emailflg
//             )
//           })
//         }
//         this.MenudataSource = new MatTableDataSource(this.MenutableData)
//         this.MenudataSource.sort = this.sort
//       }
//       return true
//     })
//   }

//   supplierModify(row : any,isForViewFlg : any) {
//     // console.log(row, ' row')
//     let data = {
//       cust_supplr_code: row.cd_cust_draft_code,
//       cust_supplr_name: row.cd_name,
//       flgModify: "Y",
//       flgAuthorize: 'N',
//       cs_authorised: row.cs_authorised,
//       flgModifyRights: this.flgModifyRights,
//       flgAddRights: this.flgAddRights,
//       flgViewCustRights: this.flgViewCustRights,
//       isForViewFlg: isForViewFlg,
//       userInformationDto: {
//         usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
//         usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
//         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
//         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
//         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
//         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
//         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
//         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
//         usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
//         usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
//       },
//     }
//     sessionStorage.setItem("stateData", JSON.stringify(data));
//     this.router.navigate(['/session/master/customer-draft-master/supplier'], { state: data });
//   }

//   vendorModify(row: any,isForViewFlg: any) {

//     let data = {
//       cust_supplr_code: row.cd_cust_draft_code,
//       cust_supplr_name: row.cd_name,
//       flgModify: "Y",
//       flgAuthorize: 'N',
//       cs_authorised: row.cs_authorised,
//       flgModifyRights: this.flgModifyRights,
//       flgAddRights: this.flgAddRights,
//       flgViewCustRights: this.flgViewCustRights,
//       isForViewFlg: isForViewFlg,
//       userInformationDto: {
//         usr_userid: atob(sessionStorage.getItem(btoa('userId')) || ''),
//         usr_name: atob(sessionStorage.getItem(btoa('username')) || ''),
//         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg')) || ''),
//         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end')) || ''),
//         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format')) || ''),
//         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code')) || ''),
//         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
//         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
//         usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon')) || ''),
//         usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch')) || ''),
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code')) || ''),
//       },
//     }
//     sessionStorage.setItem("stateData", JSON.stringify(data));
//     this.router.navigate(['/session/master/customer-draft-master/vendor'], { state: data });
//   }

//   openSnackBar(message: any) {
//     // this.snackBar.openFromComponent(SnackbarMasterComponent, {
//     //   data: message,
//     //   duration: 5000,
//     // });
//     UtilityServiceAvaxPro.showErrMessage(this.snackBar,message)
//   }

//   onFileChange(fileInput: any) {
//     this.fileData = <File>fileInput.target.files[0];
//   }

//   uploadFile() {

//     if (this.fileData == null) {
//       this.openSnackBar('Please select a file to upload');
//       return false;
//     } else {
//       if(!this.utilityServiceAvaxPro.checkValidationForFileUpload(this.fileData)){
//         this.openSnackBar("File Name should'nt have spaces");
//         return false;
//       }
//       const formData = new FormData();

//       formData.append('usr_of_branch', atob(sessionStorage.getItem(btoa('usr_of_branch'))));
//       formData.append('usr_of_siscon', atob(sessionStorage.getItem(btoa('usr_of_siscon'))));
//       formData.append('usr_company_code', atob(sessionStorage.getItem(btoa('usr_company_code'))));
//       formData.append('usr_userid', atob(sessionStorage.getItem(btoa('userId'))));
//       formData.append('file', this.fileData);

//       this.customerMasterService.upload(formData, this.userId)
//         .toPromise()
//         .then(data => {
//           this.invalidFields = data.responseData[0].invalidList;
//           this.mandatoryFields = data.responseData[0].mandatoryList;

//           if (data.responseData[0].hasOwnProperty("NEWDRAFT")) {

//             this.openSnackBar(data.responseData[0].NEWDRAFT);
//             this.showUploadExcelFlg = false;
//             this.showCustListFlag = true
//             this.getDraftList(1, this.PAGE_SIZE_ARRAY[0])
//           }

//         })
//         .catch(err => {
//         });
//     }
//   }

//   userId(formData: FormData, userId: any) {
//     throw new Error("Method not implemented.");
//   }

//   applyFilter(filterValue: string, flg) {
//     filterValue = filterValue.trim(); // Remove whitespace
//     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches    
//     this.dataSource.filter = filterValue;
//   }

//   applyCommonFilter(filterValue: string, flg) {
//     filterValue = filterValue.trim(); // Remove whitespace
//     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches    
//     this.MenudataSource.filter = filterValue;
//   }

//   customerModify(row: any, isForViewFlg) {
//     console.log( isForViewFlg , ' isForViewFlg ')
//     let data = {
//       cust_flg : 'C',
//       cust_supplr_code: row.cd_cust_draft_code,
//       cust_supplr_name: row.cd_name,
//       flgModify: "Y",
//       flgDraft: 'N',
//       flgAuthorize: 'N',
//       isForViewFlg: isForViewFlg,
//       cs_authorised: row.cs_authorised,
//       flgModifyRights: this.flgModifyRights,
//       flgAddRights: this.flgAddRights,
//       flgViewCustRights: this.flgViewCustRights,
//       userInformationDto: {
//         usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//         usr_name: atob(sessionStorage.getItem(btoa('username'))),
//         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//         usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//         usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//       },
//     }
//     sessionStorage.setItem("stateData", JSON.stringify(data));
//     this.router.navigate(['/session/master/customer-draft-master/customermaintaince'], { state: data });
//   }

//   miscPartyModify(row,isForViewFlg) {
//     let data = {
//       cust_supplr_code: row.cd_cust_draft_code,
//       cust_supplr_name: row.cd_name,
//       flgModify: "Y",
//       flgDraft: 'N',
//       flgModifyRights: this.flgModifyRights,
//       flgAddRights: this.flgAddRights,
//       flgViewCustRights: this.flgViewCustRights,
//       isForViewFlg: isForViewFlg,
//       userInformationDto: {
//         usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//         usr_name: atob(sessionStorage.getItem(btoa('username'))),
//         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//         usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//         usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//       },
//     }
//     sessionStorage.setItem("stateData", JSON.stringify(data));

//     let localdata = {
//       callFrom: 'misc_paty'
//     }
//     localStorage.setItem('moduleCallFrom', JSON.stringify(localdata));
//     this.router.navigate(['/session/master/customer-draft-master/miscparty'], { state: data });
//   }

//   searchParty() {

//     if ((this.form.get('txtPartyCode').value == null || this.form.get('txtPartyCode').value == '')) {
//       this.openSnackBar("Please Select Party details.");
//       return false
//     } else {

//       let value = this.form.get('txtPartyCode').value.trim()
//       this.utilityServiceAvaxPro.searchParty(value, '', 'PQS').subscribe(data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           if (data.responseData[0].length == 0) {
//             this.openSnackBar("no data found.");
//             return false;
//           }
//           this.partyList = data.responseData[0].map(item => {
//             return new PartyModel(item.code, item.party_name, item.cust_flg, item.cs_authorised)
//           });

//           if (this.partyList.length == 1) {
//             this.form.get('cmbParty').setValue(this.partyList[0])
//           }
//         }else{
//           this.openSnackBar(data.message)
//         }
//         return this.partyList
//       })
//     }
//   }


//   viewPartyDetails() {
//     // console.log(" view details ")
//     // console.log(" this.form.get('cmbParty') ", this.form.get('cmbParty').value)

//     if ((this.form.get('cmbParty').value == null || this.form.get('cmbParty').value == '')) {
//       this.openSnackBar("Please Select Party details.");
//       return false
//     } else {
//       let cust_flg = this.form.get('cmbParty').value.cust_flg
//       let data = {
//         cust_flg : this.form.get('cmbParty').value.cust_flg,
//         cust_supplr_code: this.form.get('cmbParty').value.cs_code,
//         cust_supplr_name: this.form.get('cmbParty').value.cs_name,
//         flgAuthorize: 'N',
//         cs_authorised: this.form.get('cmbParty').value.cs_authorised,
//         flgDraft: 'N',
//         flgModify: 'Y',
//         flgModifyRights: this.flgModifyRights,
//         flgAddRights: this.flgAddRights,
//         flgViewCustRights: this.flgViewCustRights,
//         isForViewFlg: 'M',
//         userInformationDto: {
//           usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//           usr_name: atob(sessionStorage.getItem(btoa('username'))),
//           fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//           fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//           fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//           usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//           usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//           usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//           usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//           usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//           usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//         },
//       }
//       // console.log(" final data  ", data)
//       sessionStorage.setItem("stateData", JSON.stringify(data));

//       if (cust_flg == "C") {
//         this.router.navigate(['/session/master/customer-draft-master/customermaintaince'], { state: data });
//       }
//       else if (cust_flg == "S") {
//         this.router.navigate(['/session/master/customer-draft-master/supplier'], { state: data });
//       }
//       else if (cust_flg == "V") {
//         this.router.navigate(['/session/master/customer-draft-master/vendor'], { state: data });
//       }
//       else if (cust_flg == "M") {
//         let localdata = {
//           callFrom: 'misc_paty'
//         }
//         localStorage.setItem('moduleCallFrom', JSON.stringify(localdata));
//         this.router.navigate(['/session/master/customer-draft-master/miscparty'], { state: data });
//       }
//       else if (cust_flg == "B") {
//         // this.router.navigate(['/session/master/customer-draft-master/supplier'], { state: data });
//         this.router.navigate(['/session/master/customer-draft-master/customermaintaince'], { state: data });
//       }
//     }
//   }

//   getHandledByUserRights(reportTypePageId, userCode) {
//     this.utilityService.getHandledByUserRights(reportTypePageId, userCode).subscribe(
//       data => {
//         let userRightsData = data[0]
//         if (userRightsData.responseStatus === 'SUCCESS' && userRightsData.responseCode === 'RES_200') {
//           this.userRightsList = new UserRightsModel({
//             ghead: userRightsData.responseData[0].ghead,
//             guser: userRightsData.responseData[0].guser,
//             rhead: userRightsData.responseData[0].rhead,
//             suser: userRightsData.responseData[0].suser,
//           })
//         }

//         if (reportTypePageId == this.addPageId) {
//           if (this.userRightsList.suser != "0") {
//             this.flgAddRights = true;
//           } else {
//             this.flgAddRights = false;
//           }
//         } else if (reportTypePageId == this.viewCustPageId) {
//           if (this.userRightsList.suser != "0") {
//             this.flgViewCustRights = true;
//           } else {
//             this.flgViewCustRights = false;
//           }
//         }
//         else {
//           if (this.userRightsList.suser != "0") {
//             this.flgModifyRights = true;
//           } else {
//             this.flgModifyRights = false;
//           }

//           if (this.flgModifyRights == false && this.flgViewCustRights == false) {
//             this.MenudisplayedColumns = ['cust_code', 'cust_name', 'cust_date', 'hand_by']
//             this.lstColumn = [
//               { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'DATE' },
//               { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//               { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//               { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//             ];
//           }
//         }
//       },
//       error => {
//         console.log(error)
//       }
//     )
//     //return this.userRightsList
//   }

//   getRights() {

//     let params = {
//       userInformationDto: {
//         usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//         usr_name: atob(sessionStorage.getItem(btoa('username'))),
//         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//         usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//         usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//         usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//       }
//     }
//     this.customerMasterService.getRights(params).subscribe(
//       data => {
//         if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//           this.flgAddRights = data.responseData[0].add_cust_rights;
//           this.flgModifyRights = data.responseData[0].modify_cust_rights;
//           this.flgViewCustRights = data.responseData[0].view_cust_rights;
//           this.flgAuthCustRights = data.responseData[0].auth_cust_rights;
//           // this.flgAuthCustRights=true;
//           this.flgAllowWoEmail = data.responseData[0].allow_cust_email_rights;
//           if (this.flgModifyRights == false && this.flgViewCustRights == false) {
//             this.MenudisplayedColumns = ['cust_code', 'cust_name', 'cust_date', 'hand_by']
//             this.lstColumn = [
//               { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'DATE' },
//               { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//               { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//               { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//             ];
//           }
//           // if (this.flgAuthCustRights == true) {
//           //   this.MenudisplayedColumns = ['cust_code', 'cust_name', 'cust_date', 'hand_by','select']
//           //   this.lstColumn = [
//           //     { col_name: 'DATE', db_col: 'cd_ts_created', flgLink: false, col_type: 'DATE' },
//           //     { col_name: 'DRAFT NO', db_col: 'cd_cust_draft_code', flgLink: false, col_type: 'TXT' },
//           //     { col_name: 'PARTY NAME', db_col: 'cd_name', flgLink: false, col_type: 'TXT' },
//           //     { col_name: 'HANDLED BY', db_col: 'usr_name', flgLink: false, col_type: 'TXT' },
//           //     { col_name: 'SELECT', db_col: 'select', flgLink: true, col_type: 'SELECT' },
//           //   ];
//           // }

//         }
//       },
//       error => {
//         console.log(error)
//       }
//     )
//   }
//   skipEmailVerify(draftDtl){
//     let payload={
//       cd_cust_draft_code:draftDtl.cd_cust_draft_code,
//       userInformationDto: {
//         usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//         usr_name: atob(sessionStorage.getItem(btoa('username'))),
//         fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//         fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//         fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//         usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//         usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//         usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//       },
//     }
//     this.customerMasterService.updateAllowedFlg(payload).subscribe(data=>{
//       if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//         this.allowEmailWoVerifyFlg[draftDtl.rn] = true;
//         this.openSnackBar(data.message)
//         return false;
//       } else {
//         this.allowEmailWoVerifyFlg[draftDtl.rn] = false;
//         this.openSnackBar(data.message)
//         return false;
//       }
//     })
//   }

//   showAccounts(){
//     let panRegex = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
//     if(this.form.get('txtPanNo').value.length != 10){
//      this.openSnackBar("Please Enter 10 digits  pan Number")
//      return false
//     }else if (!panRegex.test(this.form.controls.txtPanNo.value)) {
//       this.openSnackBar("Please Enter correct pan no ");
//       return false;
//     }else if(this.form.get('radCustType').value.length != 1) {
//       this.openSnackBar("Please Select Customer Type")
//       return false
//     } else {
//       let payload = {
//         userInformationDto: {
//           usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//           usr_name: atob(sessionStorage.getItem(btoa('username'))),
//           fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//           fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//           fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//           usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//           usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//           usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//           usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//           usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//           usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//         },
//         cd_pan_no : this.form.get('txtPanNo').value,
//         cd_type: this.form.get('radCustType').value
//       }
//       this.customerMasterService.showAccounts(payload).subscribe(
//         data => {
//           if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200'){
//             console.log("ACCOUNTSDATA ",data.responseData);
//             this.accountsData = data.responseData
//             this.accountsDisplayedColumns = ['cs_cust_supplr_code', 'cs_name', 'grp_code', 'grp_name']
//             this.showAccountsDataTable = true
//             this.custCodeAry = []
//             this.accountsData.forEach(item=>{
//               this.custCodeAry.push( {code: item.cs_cust_supplr_code, name: item.cs_name})
//             })
//             // this.custCodeAry = this.custCodeAry.map(item => item).filter((value, index, self) => self.indexOf(value) === index)
//           }else{
//             this.showAccountsDataTable = false
//             this.accountsData = null
//             this.openSnackBar(data.message);
//           }
//         }
//       )
//     }
//   }

//   updateAccounts(){
//     if(this.form.get('selectedValue').value == ''){
//       this.openSnackBar("Please Select The Customer Code To Update")
//       return false
//     }else{
//       let lst = []
//       this.accountsData.forEach(item=>{
//         lst.push(item.cs_cust_supplr_code)
//       })
//         let payload = {
//           userInformationDto: {
//             usr_userid: atob(sessionStorage.getItem(btoa('userId'))),
//             usr_name: atob(sessionStorage.getItem(btoa('username'))),
//             fin_year_beg: atob(sessionStorage.getItem(btoa('fin_year_beg'))),
//             fin_year_end: atob(sessionStorage.getItem(btoa('fin_year_end'))),
//             fin_year_format: atob(sessionStorage.getItem(btoa('fin_year_format'))),
//             usr_company_code: atob(sessionStorage.getItem(btoa('usr_company_code'))),
//             usr_of_siscon: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//             usr_of_branch: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//             usr_siscon_code: atob(sessionStorage.getItem(btoa('usr_of_siscon'))),
//             usr_branch_code: atob(sessionStorage.getItem(btoa('usr_of_branch'))),
//             usr_state_code: atob(sessionStorage.getItem(btoa('usr_state_code'))),
//           },
//           newGroupCode : this.form.get('selectedValue').value,
//           custCodeLst: lst
//         }
//         this.customerMasterService.updateAccounts(payload).subscribe(data => {
//           if (data.responseStatus === 'SUCCESS' && data.responseCode === 'RES_200') {
//             this.openSnackBar(data.message)
//             this.showAccounts()
//           } else {
//             this.openSnackBar(data.message)
//           }
//         })
//     }
//   }

// }
