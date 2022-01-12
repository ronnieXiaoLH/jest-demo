const { it, expect } = require("@jest/globals")

// callback
const fetchUser = (cb) => {
  setTimeout(() => {
    cb('hello')
  }, 100)
}

it('test callback', (done) => {
  fetchUser((data) => {
    expect(data).toBe('hello')
    done()
  })
})

// Promise
const userPromise = () => Promise.resolve('hello')

it('test Promise', () => {
  return userPromise().then(res => {
    expect(res).toBe('hello')
  })
})

it('test async', async () => {
  const data = await userPromise()
  expect(data).toBe('hello')
})

it('test with expect', () => {
  return expect(userPromise()).resolves.toBe('hello')
})

const rejectPromoise = () => Promise.reject('error')

it('test with expect reject', () => {
  return expect(rejectPromoise()).rejects.toBe('error')
})