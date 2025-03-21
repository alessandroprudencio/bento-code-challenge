import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { BaseFirestoreRepository } from '../../firestore/repositories/base.repository';
import { DeliveryFeeEntity } from '../entities/delivery-fee.entity';

@Injectable()
export class DeliveryFeeRepository extends BaseFirestoreRepository<DeliveryFeeEntity> {
  constructor(protected readonly firestore: Firestore) {
    super(firestore, 'delivery_fees');
  }
}
