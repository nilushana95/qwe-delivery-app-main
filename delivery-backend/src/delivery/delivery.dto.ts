
export class CreateDeliveryDto {
  readonly route: string;
  readonly package: string;
  readonly status: string;
  readonly vehicle: string;
  readonly team: string;
  _id?: string;
}
