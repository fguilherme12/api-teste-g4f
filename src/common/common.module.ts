import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategy/jwt-auth.strategy';

@Module({
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class CommonModule {}

