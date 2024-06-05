import type { ResponseType } from "axios"

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  id: string
  token: string
}

export type CreateAccountRequest = {
  username: string
  email: string
  password: string
}

export type CreateAccountResponse = {
  id: string
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

export type User = {
  username: string,
  email: string,
}

export type GetUserByIDResponse = User
export type GetUsersResponse = User[]

export type PutImageRequest = ArrayBuffer

export type Action = 'Denied' | 'Read' | 'Write' | 'Admin'

export type AddPermissionRequest = {
  action: Action
  emails: string[]
}

export type HasAccessResponse = Action

export type Endpoint = {
  readonly url: string
  readonly requiresAuth: boolean
  readonly contentType?: string
  readonly responseType?: ResponseType
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

export const UserEndpoint: Endpoint = {
  url: 'editprofile',
  requiresAuth: true
}

export const WhiteboardByIDEndpoint = (req: { id: string }): Endpoint => {
  return {
    url: `whiteboard/${req.id}`,
    requiresAuth: true
  }
}

export const UserByIDEndpoint = (req: { id: string }): Endpoint => {
  return {
    url: `users/${req.id}`,
    requiresAuth: true
  }
}

export const ImageByIDEndpoint = (req: { id: string }): Endpoint => {
  return {
    url: `image/${req.id}`,
    requiresAuth: true,
    contentType: 'application/octet-stream',
    responseType: 'blob'
  }
}

export const PermissionByIDEndpoint = (req: { id: string }): Endpoint => {
  return {
    url: `has-permission/${req.id}`,
    requiresAuth: true,
  }
}
