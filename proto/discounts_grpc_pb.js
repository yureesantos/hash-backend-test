// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var discounts_pb = require('./discounts_pb.js');

function serialize_discount_GetDiscountRequest(arg) {
  if (!(arg instanceof discounts_pb.GetDiscountRequest)) {
    throw new Error('Expected argument of type discount.GetDiscountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_discount_GetDiscountRequest(buffer_arg) {
  return discounts_pb.GetDiscountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_discount_GetDiscountResponse(arg) {
  if (!(arg instanceof discounts_pb.GetDiscountResponse)) {
    throw new Error('Expected argument of type discount.GetDiscountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_discount_GetDiscountResponse(buffer_arg) {
  return discounts_pb.GetDiscountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service that return mocked discount percentage.
var DiscountService = exports.DiscountService = {
  getDiscount: {
    path: '/discount.Discount/GetDiscount',
    requestStream: false,
    responseStream: false,
    requestType: discounts_pb.GetDiscountRequest,
    responseType: discounts_pb.GetDiscountResponse,
    requestSerialize: serialize_discount_GetDiscountRequest,
    requestDeserialize: deserialize_discount_GetDiscountRequest,
    responseSerialize: serialize_discount_GetDiscountResponse,
    responseDeserialize: deserialize_discount_GetDiscountResponse,
  },
};

exports.DiscountClient = grpc.makeGenericClientConstructor(DiscountService);
