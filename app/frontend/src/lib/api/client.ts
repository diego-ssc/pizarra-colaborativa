import axios, { type AxiosInstance, type AxiosResponse, type Method } from 'axios'
import { type Endpoint } from './api'
import { inject, type App, ref, type UnwrapRef, computed } from 'vue'

export type HTTPResponse<ReqT, ResT> = AxiosResponse<ReqT, ResT>
export type HTTPMethod = Method
export type AuthTokenGetter = () => string

export type APIOptions = {
  baseURL: string
  timeoutMillis: number
  getAuthToken: AuthTokenGetter
}

export type RequestConfig<D = any> = {
  method: HTTPMethod,
  params?: any,
  data?: any,
}

const API_CLIENT_INJECTION_KEY = 'APIClient'

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
    return this.client.get(e.url, { headers: this.getHeaders(e), responseType: e.responseType ? e.responseType : undefined})
  }

  async post<ReqT, ResT>(e: Endpoint, data?: ReqT): Promise<HTTPResponse<ResT, ReqT>> {
    return await this.client.post(e.url, data, { headers: this.getHeaders(e) })
  }

  async patch<ReqT, ResT>(e: Endpoint, data?: ReqT): Promise<HTTPResponse<ResT, ReqT>> {
    return await this.client.patch(e.url, data, { headers: this.getHeaders(e) })
  }

  async put<ReqT, ResT>(e: Endpoint, data?: ReqT): Promise<HTTPResponse<ResT, ReqT>> {
    return await this.client.put(e.url, data, { headers: this.getHeaders(e) })
  }

  async delete<ReqT, ResT>(e: Endpoint): Promise<HTTPResponse<ResT, ReqT>> {
    return await this.client.delete(e.url, { headers: this.getHeaders(e) })
  }

  async fetch<ReqT, ResT>(e: Endpoint, config: RequestConfig<ReqT>): Promise<HTTPResponse<ResT, ReqT>> {
    return await this.client({
      url: e.url,
      method: config.method,
      params: config.params,
      data: config.data,
      headers: this.getHeaders(e), 
    })
  }

  install(app: App) {
    app.provide(API_CLIENT_INJECTION_KEY, this)
  }

  private getHeaders(e: Endpoint) {
    const authToken = this.getAuthToken()
    return {
      Authorization: (e.requiresAuth && authToken) ? `Bearer ${this.getAuthToken()}` : undefined,
      'Content-Type': e.contentType ? e.contentType : 'application/json',
    }
  }
}

export function createAPIClient(options: APIOptions): APIClient {
  return new APIClient(options)
}

export function useAPIClient(): APIClient {
  return inject<APIClient>(API_CLIENT_INJECTION_KEY) as APIClient
}

function useFetch<ReqT, ResT>(e: Endpoint) {
  const client = inject<APIClient>(API_CLIENT_INJECTION_KEY) as APIClient

  const data = ref<ResT | null>(null)
  const error = ref<unknown>(null)
  const isLoading = ref<boolean>(false)

  const fetch = async (config: RequestConfig<ReqT>) => {
    try {
      data.value = null
      error.value = null
      isLoading.value = true
      const response = await client.fetch(e, config)
      data.value = response.data as UnwrapRef<ResT>
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    fetch,
    data: computed(() => data.value),
    error: computed(() => error.value),
    isLoading: computed(() => isLoading.value)
  }
}

export function useGet<ResT>(e: Endpoint) {
  const fetchClient = useFetch<any, ResT>(e)

  return {
    get: (params?: any) => fetchClient.fetch({ method: 'GET', params: params}),
    data: fetchClient.data,
    error: fetchClient.error,
    isLoading: fetchClient.isLoading
  }
}

export function usePost<ReqT, ResT>(e: Endpoint) {
  const fetchClient = useFetch<ReqT, ResT>(e)

  return {
    post: (data?: ReqT) => fetchClient.fetch({method: 'POST', data: data}),
    data: fetchClient.data,
    error: fetchClient.error,
    isLoading: fetchClient.isLoading
  }
}

export function usePatch<ReqT, ResT>(e: Endpoint) {
  const fetchClient = useFetch<ReqT, ResT>(e)

  return {
    patch: (data?: ReqT) => fetchClient.fetch({method: 'PATCH', data: data}),
    data: fetchClient.data,
    error: fetchClient.error,
    isLoading: fetchClient.isLoading
  }
}

export function usePut<ReqT, ResT>(e: Endpoint) {
  const fetchClient = useFetch<ReqT, ResT>(e)

  return {
    put: (data?: ReqT) => fetchClient.fetch({method: 'PUT', data: data}),
    data: fetchClient.data,
    error: fetchClient.error,
    isLoading: fetchClient.isLoading
  }
}
