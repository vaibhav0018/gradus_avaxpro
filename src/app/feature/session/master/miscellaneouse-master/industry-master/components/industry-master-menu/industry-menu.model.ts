export class IndustryMenuModel{
    ind_industry_code: string;
    ind_industry: string;
    sind_industry_desc: string;
    sind_subindustry_code: string;
    ssind_sub_subindustry_code: string;
    ssind_industry_desc:string
    row_number:string
    show: boolean;
    constructor(
        ind_industry_code: string,
        ind_industry: string,
        sind_industry_desc: string,
        sind_subindustry_code: string,
        ssind_sub_subindustry_code: string,
        ssind_industry_desc:string,
        row_number:string,
        show: boolean
    ) {
        this.ind_industry_code = ind_industry_code
        this.ind_industry = ind_industry    
        this.sind_industry_desc = sind_industry_desc
        this.sind_subindustry_code = sind_subindustry_code
        this.ssind_sub_subindustry_code = ssind_sub_subindustry_code
        this.ssind_industry_desc = ssind_industry_desc
        this.row_number = row_number
        this.show = show

    }
}

export class IndustryMasterModel{
    ind_industry_code: string;
    ind_industry: string;
    constructor(
        ind_industry_code: string,
        ind_industry: string,
    ) {
        this.ind_industry_code = ind_industry_code
        this.ind_industry = ind_industry    
    }
}

export class SubIndustryMasterModel{
    sind_industry_code: string;
    sind_industry_desc: string;
    sind_subindustry_code: string;
    constructor(
        sind_industry_code: string,
        sind_industry_desc: string,
        sind_subindustry_code: string,
    ) {
        this.sind_industry_code = sind_industry_code
        this.sind_industry_desc = sind_industry_desc    
        this.sind_subindustry_code = sind_subindustry_code
    }
}

export class SubSubIndustryMasterModel{
    ssind_industry_code: string;
    ssind_industry_desc: string;
    ssind_sub_subindustry_code: string;
    ssind_subindustry_code: string;
    constructor(
        ssind_industry_code: string,
        ssind_industry_desc: string,
        ssind_sub_subindustry_code: string,
        ssind_subindustry_code: string
    ) {
        this.ssind_industry_code = ssind_industry_code
        this.ssind_industry_desc = ssind_industry_desc    
        this.ssind_sub_subindustry_code = ssind_sub_subindustry_code
        this.ssind_subindustry_code = ssind_subindustry_code
    }
}
