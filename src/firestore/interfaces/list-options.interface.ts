import { DocumentData, WhereFilterOp } from '@google-cloud/firestore';

export interface IListOptions<T = DocumentData> {
  limit?: number;
  orderBy?:
    | {
        field: keyof T & string;
        direction: 'asc' | 'desc';
      }
    | Array<{
        field: keyof T & string;
        direction: 'asc' | 'desc';
      }>;
  where?: Array<{
    field: keyof T & string;
    operator: WhereFilterOp;
    value: any;
  }>;
}
