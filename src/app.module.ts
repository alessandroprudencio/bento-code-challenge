import { Module } from '@nestjs/common';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
