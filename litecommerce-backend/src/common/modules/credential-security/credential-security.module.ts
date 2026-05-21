import { Module, Global } from '@nestjs/common';
import { CredentialSecurityService } from './credential-security.service';

@Global()
@Module({
    providers: [CredentialSecurityService],
    exports: [CredentialSecurityService],
})
export class CredentialSecurityModule { }
