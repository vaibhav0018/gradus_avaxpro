//export class MakeMaster {}
export class MakeMasterTableModel {
    make_code: string;
    make_short_name: string;
    make_description: string;
    make_principle: string;
    viewMode: boolean;
    companyList?: string;
    show:boolean;
    constructor(
        make_code: string,
        make_short_name: string,
        make_description: string,
        make_principle: string,
        viewMode: boolean,
        show:boolean

    ) {

        this.make_code = make_code
        this.make_short_name = make_short_name
        this.make_description = make_description
        this.make_principle = make_principle
        this.viewMode = viewMode
        this.show = show
    }
}

export class FilterModel {
    company_code: string;
    company_short_name: string;
    flg_extend: string;
    cmk_principal_mfg_flg: string;
    excluded:boolean;

    constructor(
        company_code: string,
        company_short_name: string,
        flg_extend: string,
        cmk_principal_mfg_flg: string,
        excluded:boolean
    ) {

        this.company_code = company_code
        this.company_short_name = company_short_name
        this.flg_extend = flg_extend
        this.cmk_principal_mfg_flg = cmk_principal_mfg_flg
        this.excluded= excluded
    }
}


export class TableMakeMasterCompany {
    company_code: string;
    company_short_name: string;


    constructor(
        company_code: string,
        company_short_name: string
    ) {

        this.company_code = company_code
        this.company_short_name = company_short_name

    }


}
export class CheckBoxModel {
    constructor(
        public checkbox_name: string,
        public selected: boolean,
        public checkbox_columnId: number,
        public checkbox_code?: string,
        public type?: string
    ) { }
}
export class TableSettings {
    public checkbox_fields: CheckBoxModel[] = []
}
