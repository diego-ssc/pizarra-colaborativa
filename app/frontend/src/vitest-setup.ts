import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import { HttpResponse, http } from 'msw'

export const TEST_API_URL = 'http://example.com/api'

export const USER_1_EMAIL = 'user1@example.com'
export const USER_1_PASSWORD = 'user1'

export const DEFAULT_TOKEN = 'jwt-token'

const restHandlers = [
  http.post(TEST_API_URL + '/auth/login', async ({ request }) => {
    // TODO: Fix tslint error
    const { email, password } = await request.json()
    if (email === USER_1_EMAIL && password === USER_1_PASSWORD) {
      return HttpResponse.json(
        {
          token: DEFAULT_TOKEN
        },
        {
          status: 200
        }
      )
    }
    return new HttpResponse(null, { status: 404 })
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
