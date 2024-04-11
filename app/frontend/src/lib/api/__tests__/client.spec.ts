import { describe, test, expect } from 'vitest'
import { APIClient } from '../client'
import { DEFAULT_TOKEN, TEST_API_URL, USER_1_EMAIL, USER_1_PASSWORD } from '@/vitest-setup'
import { LoginEndpoint, type LoginRequest, type LoginRespone } from '../api'

const TIMEOUT = 5000

describe('API client', () => {
  test('makes post request', async () => {
    const client = new APIClient({
      baseURL: TEST_API_URL,
      timeoutMillis: TIMEOUT,
      getAuthToken: () => {
        return null
      }
    })
    const response = await client.post<LoginRequest, LoginRespone>(LoginEndpoint, {
      email: USER_1_EMAIL,
      password: USER_1_PASSWORD
    })
    expect(response.status).toEqual(200)
    expect(response.data).toEqual({
      token: DEFAULT_TOKEN
    })
  })
})
