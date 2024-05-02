import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/enums/user-role.enum';

export const ROLES_KEY: string = 'roles';
export const Role = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
