import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
export type CommentDocument = HydratedDocument<Comment>;
@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true }) text!: string;
  @Prop({ type: MSchema.Types.ObjectId, ref: 'Task', required: true }) task!: string;
  @Prop({ type: MSchema.Types.ObjectId, ref: 'User', required: true }) author!: string;
  @Prop() authorName?: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
