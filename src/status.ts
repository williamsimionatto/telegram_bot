import axios from 'axios'

const app = async () => {
  try {
    return await axios.get('https://www.google.com/', { timeout: 30000 })
  } catch(error) {
    return error
  }
}

export default app
