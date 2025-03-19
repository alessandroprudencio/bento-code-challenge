import { Module, Global } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: Firestore,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const firestore = new Firestore({
          projectId: configService.get<string>('firebase.projectId'),
        });

        if (configService.get<string>('firebase.nodeEnv') === 'development') {
          firestore.settings({
            host: configService.get<string>('firebase.emulatorHost'),
            ssl: false,
          });
        }

        return firestore;
      },
    },
  ],
  exports: [Firestore],
})
export class FirestoreModule {}
