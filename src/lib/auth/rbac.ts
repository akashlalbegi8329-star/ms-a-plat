export enum UserRole {
  ADMIN = 'ADMIN',
  CONSULTANT = 'CONSULTANT',
  BUSINESS_OWNER = 'BUSINESS_OWNER',
  CONTRIBUTOR = 'CONTRIBUTOR'
}

export function canAccessDashboard(role: UserRole): boolean {
  return role !== UserRole.CONTRIBUTOR
}

export function canCreateAssessment(role: UserRole): boolean {
  return role === UserRole.CONSULTANT || role === UserRole.ADMIN
}

export function canManageUsers(role: UserRole): boolean {
  return role === UserRole.ADMIN
}

export function canViewAllBusinesses(role: UserRole): boolean {
  return role === UserRole.ADMIN || role === UserRole.CONSULTANT
}

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'Administrator'
    case UserRole.CONSULTANT:
      return 'Consultant'
    case UserRole.BUSINESS_OWNER:
      return 'Business Owner'
    case UserRole.CONTRIBUTOR:
      return 'Pending Approval'
    default:
      return 'Unknown'
  }
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return 'text-red-600 bg-red-50'
    case UserRole.CONSULTANT:
      return 'text-blue-600 bg-blue-50'
    case UserRole.BUSINESS_OWNER:
      return 'text-green-600 bg-green-50'
    case UserRole.CONTRIBUTOR:
      return 'text-amber-600 bg-amber-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}
