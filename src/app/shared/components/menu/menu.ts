
import { ConstantsServiceAvaxPro } from "../../../core/services/constants_avaxpro.service";

// export class Menu {
//   constructor(
//     public id: number,
//     public title: string,
//     public routerLink: string,
//     public href: string,
//     public icon: string,
//     public target: string,
//     public hasSubMenu: boolean,
//     public parentId: number
//   ) { }
// }
let aryMainMenu = ConstantsServiceAvaxPro.aryEntryMenu;



ConstantsServiceAvaxPro.aryPrintingMenu.forEach(element => {
  aryMainMenu.push(element)
});

ConstantsServiceAvaxPro.aryReportMenu.forEach(element => {
  aryMainMenu.push(element)
});

ConstantsServiceAvaxPro.aryStockReport.forEach(element => {
  aryMainMenu.push(element)
});

ConstantsServiceAvaxPro.aryMasterMenu.forEach(element => {
  aryMainMenu.push(element)
});

ConstantsServiceAvaxPro.aryQueryMenu.forEach(element => {
  aryMainMenu.push(element)
});

ConstantsServiceAvaxPro.aryMISReport.forEach(element => {
  aryMainMenu.push(element)
});

ConstantsServiceAvaxPro.arySalesTaxReport.forEach(element => {
  aryMainMenu.push(element)
});

ConstantsServiceAvaxPro.aryPlanningReport.forEach(element => {
  aryMainMenu.push(element)
});

//added by nitin 14-01-20
ConstantsServiceAvaxPro.aryMiscellaneousMenu.forEach(element => {
  aryMainMenu.push(element)
});

ConstantsServiceAvaxPro.aryFollowupMenu.forEach(element => {
  aryMainMenu.push(element)
});
// ConstantsServiceAvaxPro.aryUserProfileMenu.forEach(element => {
//   aryMainMenu.push(element)
// });
ConstantsServiceAvaxPro.aryQuickMenu.forEach(element => {
  aryMainMenu.push(element)
});
export const verticalMenuItems = aryMainMenu;
//ConstantsServiceAvaxPro.aryMenu
export const horizontalMenuItems = aryMainMenu;


