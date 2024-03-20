export type LoginRequest = {
  email: string
  password: string
}

export type LoginRespone = {
  token: string
}

export type CreateAccountRequest = {
  username: string
  email: string
  password: string
}

export type CreateAccountResponse = {
  token: string
}

export type Endpoint = {
  readonly url: string
  readonly requiresAuth: boolean
}

export const LoginEndpoint: Endpoint = {
  url: 'auth/login',
  requiresAuth: false
}

export const CreateAccountEndpoint: Endpoint = {
  url: 'auth/register',
  requiresAuth: false
}

export const HomeEndpoint: Endpoint = {
  url: '/',
  requiresAuth: true
}
