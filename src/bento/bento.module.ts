import { Global, Module } from '@nestjs/common';
import { FetchDeliveryFeeService } from './fetch-delivery-fee.service';
import { FetchUserProfileService } from './fetch-user-profile.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from './http-client.service';
import { ErrorHandlerService } from './error-handler.service';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 3,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    FetchDeliveryFeeService,
    FetchUserProfileService,
    HttpClientService,
    ErrorHandlerService,
  ],
  exports: [FetchDeliveryFeeService, FetchUserProfileService],
})
export class BentoModule {}
