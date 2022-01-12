const axios = {
  get: jest.fn(() => Promise.resolve({data: {username: 'ronnie'}}))
}

module.exports = axios