// package: discount
// file: discounts.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as discounts_pb from "./discounts_pb";

interface IDiscountService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getDiscount: IDiscountService_IGetDiscount;
}

interface IDiscountService_IGetDiscount extends grpc.MethodDefinition<discounts_pb.GetDiscountRequest, discounts_pb.GetDiscountResponse> {
    path: "/discount.Discount/GetDiscount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<discounts_pb.GetDiscountRequest>;
    requestDeserialize: grpc.deserialize<discounts_pb.GetDiscountRequest>;
    responseSerialize: grpc.serialize<discounts_pb.GetDiscountResponse>;
    responseDeserialize: grpc.deserialize<discounts_pb.GetDiscountResponse>;
}

export const DiscountService: IDiscountService;

export interface IDiscountServer extends grpc.UntypedServiceImplementation {
    getDiscount: grpc.handleUnaryCall<discounts_pb.GetDiscountRequest, discounts_pb.GetDiscountResponse>;
}

export interface IDiscountClient {
    getDiscount(request: discounts_pb.GetDiscountRequest, callback: (error: grpc.ServiceError | null, response: discounts_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    getDiscount(request: discounts_pb.GetDiscountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: discounts_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    getDiscount(request: discounts_pb.GetDiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: discounts_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
}

export class DiscountClient extends grpc.Client implements IDiscountClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getDiscount(request: discounts_pb.GetDiscountRequest, callback: (error: grpc.ServiceError | null, response: discounts_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    public getDiscount(request: discounts_pb.GetDiscountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: discounts_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
    public getDiscount(request: discounts_pb.GetDiscountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: discounts_pb.GetDiscountResponse) => void): grpc.ClientUnaryCall;
}
