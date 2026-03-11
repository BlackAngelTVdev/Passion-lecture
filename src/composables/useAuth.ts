export interface User {
  id: number
  username: string
  admin: boolean
  createdAt: string
}

export const getConnectedUser = (): User | null => {
  const userData = localStorage.getItem('user')
  return userData ? JSON.parse(userData) : null
}

export const getConnectedUserId = (): number | null => {
  const user = getConnectedUser()
  return user ? user.id : null
}

export const isAdmin = (): boolean => {
  const user = getConnectedUser()
  return user ? user.admin === true : false
}
