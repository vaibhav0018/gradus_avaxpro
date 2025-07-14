export class PartyDetailsModel {
  party_code: string
  party_name: string
  constructor(party_code: string, party_name: string) {
    this.party_code = party_code
    this.party_name = party_name
  }
}
