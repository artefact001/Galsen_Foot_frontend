// src/app/interfaces/user.interface.ts
export interface User {
  id?: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  zone: string
  password?: string
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
}

export enum UserRole {
  ADMIN = 'ADMIN',
  ZONE_MANAGER = 'ZONE_MANAGER',
  USER = 'USER'
}
