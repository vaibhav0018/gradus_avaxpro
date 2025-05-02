export class BranchModel {
    branch_name: string
    branch_code: string
    siscon_code: string
    branch_city: string
  
    constructor(
      branch_name: string,
      branch_code: string,
      siscon_code: string,
      branch_city: string
    ) {
      this.branch_name = branch_name
      this.branch_code = branch_code
      this.siscon_code = siscon_code
      this.branch_city = branch_city
    }
  }