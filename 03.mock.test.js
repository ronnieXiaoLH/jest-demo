const { it, expect } = require('@jest/globals')
const axios = require('axios')
const getUserName = require('./user')

// 让 jest 模拟 axios
// jest.mock('axios')
// axios.get.mockImplementation(() => {
//   return Promise.resolve({data: {username: 'ronnie'}})
// })

// axios.get.mockReturnValue(Promise.resolve({data: {username: 'ronnie'}}))

// axios.get.mockResolvedValue({data: {username: 'ronnie'}})

function mockTest(shouldCall, cb) {
  if (shouldCall) {
    return cb(123)
  }
}

it('test with mock function', () => {
  const mockCb = jest.fn()
  mockTest(true, mockCb)
  expect(mockCb).toHaveBeenCalled()
  expect(mockCb).toHaveBeenCalledWith(123)
  expect(mockCb).toHaveBeenCalledTimes(1)
})

it('test mock with implementation', () => {
  const mockCb = jest.fn().mockReturnValue(20)
  mockTest(true, mockCb)
  console.log(mockCb.mock.results)
})

it('test with mock modules', () => {
  return getUserName(1).then((name) => {
    console.log(name)
    expect(axios.get).toHaveBeenCalled()
    expect(axios.get).toHaveBeenCalledTimes(1)
  })
})
