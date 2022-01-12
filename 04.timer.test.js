const { it, expect } = require("@jest/globals")

const fetchUser = cb => {
  setTimeout(() => {
    cb('hello')
  }, 1000)
}

const loopFetchUser = cb => {
  setTimeout(() => {
    cb('one')
    setTimeout(() => {
      cb('two')
    }, 2000)
  }, 1000)
}

// 让 jest 来接管 setTimeout
jest.useFakeTimers()

it('test the callback after 1 sec', () => {
  const callback = jest.fn()
  fetchUser(callback)
  expect(callback).not.toHaveBeenCalled()
  jest.runAllTimers()
  expect(callback).toHaveBeenCalled()
  expect(callback).toHaveBeenCalledWith('hello')
  expect(callback).toHaveBeenCalledTimes(1)
})

it('test the callback in timeout loop', () => {
  const callback = jest.fn()
  loopFetchUser(callback)
  jest.runOnlyPendingTimers()
  expect(callback).toHaveBeenCalled()
  expect(callback).toHaveBeenCalledTimes(1)
  expect(callback).toHaveBeenCalledWith('one')
  jest.runOnlyPendingTimers()
  expect(callback).toHaveBeenCalledWith('two')
  expect(callback).toHaveBeenCalledTimes(2)
})

it('test the callback with advance timer', () => {
  const callback = jest.fn()
  loopFetchUser(callback)
  jest.advanceTimersByTime(500)
  expect(callback).not.toHaveBeenCalled()
  jest.advanceTimersByTime(500)
  expect(callback).toHaveBeenCalled()
  expect(callback).toHaveBeenCalledTimes(1)
  expect(callback).toHaveBeenCalledWith('one')
  jest.advanceTimersByTime(2000)
  expect(callback).toHaveBeenCalledTimes(2)
  expect(callback).toHaveBeenCalledWith('two')
})