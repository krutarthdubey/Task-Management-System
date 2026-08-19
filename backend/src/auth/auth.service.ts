import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/user.schema';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private users: Model<UserDocument>,
    private jwt: JwtService,
  ) {}
  private safe(u: any) {
    const x = u.toObject ? u.toObject() : u;
    delete x.password;
    return x;
  }
  private token(u: any) {
    return this.jwt.sign({ sub: u._id.toString(), email: u.email, name: u.name, role: u.role });
  }
  async register(dto: any) {
    if (await this.users.findOne({ email: dto.email.toLowerCase() }))
      throw new ConflictException('Email already registered');
    const u = await this.users.create({
      name: dto.name,
      email: dto.email.toLowerCase(),
      password: await bcrypt.hash(dto.password, 10),
      role: 'member',
    });
    return { token: this.token(u), user: this.safe(u) };
  }
  async login(dto: any) {
    const u = await this.users.findOne({ email: dto.email.toLowerCase() });
    if (!u || !(await bcrypt.compare(dto.password, u.password)))
      throw new UnauthorizedException('Invalid email or password');
    return { token: this.token(u), user: this.safe(u) };
  }
  async guest() {
    let u = await this.users.findOne({ email: 'guest@ablespace.local' });
    if (!u)
      u = await this.users.create({
        name: 'Guest User',
        email: 'guest@ablespace.local',
        password: await bcrypt.hash(Math.random().toString(), 10),
        role: 'guest',
      });
    return { token: this.token(u), user: this.safe(u) };
  }
}
