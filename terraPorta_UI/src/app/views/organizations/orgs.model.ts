export class OrganizationsModel {
    constructor(
        public id: number,
        public name: string,
        public owner: string,
        public owner_name: string,
        public members_list: Array<number>,
        public location: string,
        public state: string,
        public left_days: number,
        public requests_no: number
    ){}
}
