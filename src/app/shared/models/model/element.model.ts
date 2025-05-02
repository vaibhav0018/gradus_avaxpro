/**
 * Element Model: A Common model for any elements like dropdown, radio, input field etc
 * where code and name are required to be present as values
 */
export class ElementModel {
    element_code: string
    element_name: string
  
    constructor(element_code: string, element_name: string) {
      this.element_code = element_code
      this.element_name = element_name
    }
  }
  
  export class RadioElementModel extends ElementModel {
    checked?: boolean
  
    constructor(element_code: string, element_name: string, checked?: boolean) {
      super(element_code, element_name)
      this.checked = checked
    }
  }
  
  export class ElementValueModel {
    element_code: string
    element_name: string
    element_value: string | number | object
  
    constructor({
      element_code,
      element_name,
      element_value,
    }: {
      element_code: string
      element_name: string
      element_value: string | number | object
    }) {
      this.element_code = element_code
      this.element_name = element_name
      this.element_value = element_value
    }
  }
  