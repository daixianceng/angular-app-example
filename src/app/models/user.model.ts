import { Option } from './option.model';

export const USER_STATUS: Option[] = [
  { value: 1, label: 'Enabled' },
  { value: 0, label: 'Disabled' }
];

export class User {
  id: string;
  username: string;
  email: string;
  status: number;
  statusLabel: string;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  passwordNew: string;
  accessToken: string;
}
