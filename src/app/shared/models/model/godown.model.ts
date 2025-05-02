export class GodownModel {
    godown_code: string
    godown_name: string
    godown_short_name?: string
  
    constructor(godown_code: string, godown_name: string, godown_short_name?: string) {
      this.godown_code = godown_code
      this.godown_name = godown_name
      this.godown_short_name = godown_short_name
    }
  }
  