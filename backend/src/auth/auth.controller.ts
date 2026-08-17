import { Body, Controller, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
class RegisterDto { @IsString() @IsNotEmpty() name!:string; @IsEmail() email!:string; @MinLength(6) password!:string; }
class LoginDto { @IsEmail() email!:string; @IsString() password!:string; }
@Controller('auth') export class AuthController { constructor(private auth:AuthService){} @Post('register') register(@Body() d:RegisterDto){return this.auth.register(d)} @Post('login') login(@Body() d:LoginDto){return this.auth.login(d)} @Post('guest') guest(){return this.auth.guest()} }
