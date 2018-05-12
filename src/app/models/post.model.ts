import { Options } from './option.model';

export const POST_STATUS: Options = [
  { value: 1, label: 'Enabled' },
  { value: 0, label: 'Disabled' }
];

export type PostTags = string[];

export class Post {
  id: string;
  categoryId: string;
  title: string;
  key: string;
  tags: string;
  tagCollection: PostTags;
  intro: string;
  content: string;
  authorId: string;
  status: number;
  statusLabel: string;
  isEnabled: boolean;
  sequence: string;
  createdAt: string;
  updatedAt: string;
}
