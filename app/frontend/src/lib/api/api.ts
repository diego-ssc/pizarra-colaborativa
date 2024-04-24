export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
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

export type CreateWhiteboardRequest = {
  title: string
}

export type Whiteboard = {
  whiteBoardId: string
  title: string
  createdAt: string
  updatedAt: string
}

export type CreateWhiteboardResponse = Whiteboard

export type GetWhiteboardsResponse = Whiteboard[]

export type GetWhiteboardByIDResponse = Whiteboard

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

export const WhiteboardEndpoint: Endpoint = {
  url: 'whiteboard',
  requiresAuth: true
}

export const WhiteboardByIDEndpoint = (req: { id: string }): Endpoint => {
  return {
    url: `whiteboard/${req.id}`,
    requiresAuth: true
  }
}
