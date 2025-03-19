import { Module } from '@nestjs/common';
import { RequestsModule } from './requests/requests.module';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';
import firebaseConfig from './config/firebase.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [firebaseConfig],
    }),
    FirestoreModule,
    RequestsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
