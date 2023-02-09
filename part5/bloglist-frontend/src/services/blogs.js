import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.get(baseUrl, config)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken }