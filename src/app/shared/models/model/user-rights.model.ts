export class UserRightsModel {
    ghead: string
    guser: string
    rhead: string
    suser: string
    constructor({
      ghead,
      guser,
      rhead,
      suser,
    }: {
      ghead: string
      guser: string
      rhead: string
      suser: string
    }) {
      this.ghead = ghead
      this.guser = guser
      this.rhead = rhead
      this.suser = suser
    }
  }
  