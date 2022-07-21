export interface IClient{
    get<T>(url: string, data?: any):any;
}

export default IClient;