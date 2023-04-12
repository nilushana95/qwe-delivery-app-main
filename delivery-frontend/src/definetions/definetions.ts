export interface IUser {
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
    _id?: string;
}
export interface IRoute{
    name: string;
    description: string;
    source: string;
    destination: string;
    _id?: string;
}
export interface IDeliveryBase {
    package: string;
    vehicle: string;
    team: string;
    _id?: string;
}

export interface IDelivery extends IDeliveryBase {
    route: IRoute;
}
export interface IDeliveryCreate extends IDeliveryBase {
    route: string;
}