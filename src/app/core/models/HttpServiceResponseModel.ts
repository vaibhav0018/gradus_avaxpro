export class HttpServiceResponseModel {
    private _responseData: any
    private _responseHeader: ResponseHeader
    private payload?:any; // for now type any 

    get responseData(): any {
      return this._responseData
    }
  
    set responseData(responseData: any) {
      this._responseData = responseData
    }
  
    get responseHeader() {
      return this._responseHeader
    }
  
    set responseHeader(responseHeader) {
      this._responseHeader = responseHeader
    }
  }
  class ResponseHeader {
    public responseStatus:any;
    public responseMessage:any;
    public responseCode:any;
  }
  