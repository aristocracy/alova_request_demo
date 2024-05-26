
export interface softwareListData {
    page:number,
    size:number,
    category_id:number
};
export interface responseData {
    code:number,
    message:string,
    result:Record<string,any>
};