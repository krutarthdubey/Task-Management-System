import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
export type ProjectDocument = HydratedDocument<Project>;
@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true }) name!: string;
  @Prop() description?: string;
  @Prop({ default: '' }) color!: string;
  @Prop({ type: MSchema.Types.ObjectId, ref: 'User', required: true }) owner!: string;
  @Prop({ type: [String], default: [] }) members!: string[];
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
