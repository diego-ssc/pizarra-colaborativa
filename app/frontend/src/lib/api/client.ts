import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { type Endpoint } from './api'
import type { App } from 'vue'

export type HTTPResponse<ReqT, ResT> = AxiosResponse<ReqT, ResT>
export type AuthTokenGetter = () => string | null

export type APIOptions = {
  baseURL: string
  timeoutMillis: number
  getAuthToken: AuthTokenGetter
}

export class APIClient {
  private readonly client: AxiosInstance
  private getAuthToken: AuthTokenGetter

  constructor(options: APIOptions) {
    this.getAuthToken = options.getAuthToken
    this.client = axios.create({
      baseURL: options.baseURL,
      timeout: options.timeoutMillis,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async get<ResT>(e: Endpoint): Promise<HTTPResponse<ResT, any>> {
    return this.client.get(e.url, e.requiresAuth ? this.getAuthHeader() : {})
  }

  async post<ReqT, ResT>(e: Endpoint, data?: ReqT): Promise<HTTPResponse<ResT, ReqT>> {
    return await this.client.post(e.url, data, e.requiresAuth ? this.getAuthHeader() : {})
  }

  install(app: App) {
    app.provide('APIClient', this)
  }

  private getAuthHeader() {
    const authToken = this.getAuthToken()
    if (authToken) {
      return {
        headers: {
          Authorization: `Bearer ${this.getAuthToken()}`
        }
      }
    }
    return {}
  }
}

export function createAPIClient(options: APIOptions): APIClient {
  return new APIClient(options)
}
