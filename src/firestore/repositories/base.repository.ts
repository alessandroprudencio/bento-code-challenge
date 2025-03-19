import {
  DocumentData,
  Firestore,
  WithFieldValue,
} from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { IListOptions } from '../interfaces/list-options.interface';

@Injectable()
export abstract class BaseFirestoreRepository<T extends DocumentData> {
  constructor(
    protected readonly firestore: Firestore,
    protected readonly collectionName: string,
  ) {}

  async create(data: WithFieldValue<T>): Promise<string> {
    const docRef = await this.firestore
      .collection(this.collectionName)
      .add(data as WithFieldValue<DocumentData>);

    return docRef.id;
  }

  async list(options?: IListOptions<T>): Promise<T[]> {
    let query: FirebaseFirestore.Query<DocumentData> =
      this.firestore.collection(this.collectionName);

    if (options?.where) {
      for (const { field, operator, value } of options.where) {
        query = query.where(field, operator, value);
      }
    }

    if (options?.orderBy) {
      const orders = Array.isArray(options.orderBy)
        ? options.orderBy
        : [options.orderBy];

      for (const { field, direction } of orders) {
        query = query.orderBy(field, direction);
      }
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    try {
      const snapshot = await query.get();
      return snapshot.docs.map((doc) => doc.data() as T);
    } catch (error) {
      throw new Error(`Error while listing documents: ${error}`);
    }
  }
}
