import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; import { HydratedDocument } from 'mongoose';
export type UserDocument=HydratedDocument<User>;
@Schema({timestamps:true}) export class User { @Prop({required:true}) name!:string; @Prop({required:true,unique:true}) email!:string; @Prop({required:true}) password!:string; @Prop({default:'member'}) role!:string; @Prop({default:''}) avatar?:string; @Prop({default:''}) bio?:string; }
export const UserSchema=SchemaFactory.createForClass(User);
