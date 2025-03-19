import { Module } from '@nestjs/common';
import { RequestsModule } from './requests/requests.module';
import { FirestoreModule } from './firestore/firestore.module';
import { ConfigModule } from '@nestjs/config';
import { BentoModule } from './bento/bento.module';
import firebaseConfig from './config/firebase.config';
import bentoConfig from './config/bento.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [firebaseConfig, bentoConfig],
    }),
    FirestoreModule,
    RequestsModule,
    BentoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
