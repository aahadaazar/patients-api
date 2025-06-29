import { UserRole } from '../../common/enums/user-role.enum';

export interface User {
  id: string;
  password: string;
  role: UserRole;
}
