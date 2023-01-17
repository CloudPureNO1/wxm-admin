export interface ApiParamsInBase{
    transCode:string|number,
    currentPage?:number,
    pageSize?:number,
}
export interface ApiParamsInType extends ApiParamsInBase{
    [key:string]:any
}