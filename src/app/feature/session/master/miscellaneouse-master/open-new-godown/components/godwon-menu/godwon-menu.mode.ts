export class GodwonMenu {
    gd_godown_code: string;
    gd_godown_name: string;
    gd_short_name: string;
    gd_pts_flg: string;
    gd_address: string;
    br_city: string;


    constructor(
        gd_godown_code: string,
        gd_godown_name: string,
        gd_short_name: string,
        gd_pts_flg: string,
        gd_address: string,
        br_city: string,
    ) {
        this.gd_godown_code = gd_godown_code
        this.gd_godown_name = gd_godown_name
        this.gd_short_name = gd_short_name

        this.gd_pts_flg = gd_pts_flg
        this.gd_address = gd_address
        this.br_city = br_city
    }
}

export class GodwonCityModel {
    br_city: string;
    br_branch_code: string;
    constructor(
        br_city: string,
        br_branch_code: string,
    ) {
        this.br_city = br_city
        this.br_branch_code = br_branch_code
    }
}
