export class PhysicalLocationModel {
  physical_location_code: string
  physical_location_name: string

  constructor(physical_location_code: string, physical_location_name: string) {
    this.physical_location_code = physical_location_code
    this.physical_location_name = physical_location_name
  }
}
