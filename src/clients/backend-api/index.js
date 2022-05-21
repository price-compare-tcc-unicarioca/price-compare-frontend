import axios from 'axios'
import moment from 'moment'
import { ResponseError, UnauthenticatedError } from './errors'

class AccessToken {
  constructor (token, expiration) {
    this.token = token
    this.expiration = moment(expiration)
  }

  isValid () {
    return moment().isBefore(this.expiration)
  }
}

export class Client {
  constructor () {
    if (localStorage.getItem('access_token')) {
      const credentials = JSON.parse(localStorage.getItem('access_token'))
      this.accessToken = new AccessToken(credentials.token, moment(credentials.expirationDate))
    }

    this.client = axios.create({
      baseURL: 'http://127.0.0.1:8080/'
    })
  }

  isAuthenticated () {
    return this.accessToken?.isValid()
  }

  async searchSales ({ ean, longitude, latitude }) {
    try {
      const { data } = await this.client.get('/sale/search', {
        params: {
          longitude,
          latitude,
          ean
        }
      })

      return data
    } catch (error) {
      throw new ResponseError(error?.response?.data?.message || error.message)
    }
  }

  async signIn ({ email, password }) {
    const { data } = await this.client.post('/auth/sign-in', {
      email,
      password
    })

    const { token, expirationDate } = data

    this.accessToken = new AccessToken(token, expirationDate)
    localStorage.setItem('access_token', JSON.stringify({
      token,
      expirationDate
    }))
  }

  async signUp ({ firstName, lastName, email, password }) {
    try {
      await this.client.post('/auth/sign-up', {
        firstName,
        lastName,
        email,
        password
      })
    } catch (error) {
      throw new ResponseError(error?.response?.data?.message || error.message)
    }
  }

  signOut () {
    this.accessToken = null
    localStorage.removeItem('access_token')
  }

  async getCurrentUser () {
    if (!this.accessToken || !this.accessToken.isValid()) {
      throw new UnauthenticatedError('Authencation is necessary')
    }

    try {
      const { data } = await this.client.get('/auth/current', {
        headers: {
          Authorization: `Bearer ${this.accessToken.token}`
        }
      })

      return data
    } catch (error) {
      throw new ResponseError(error?.response?.data?.message || error.message)
    }
  }

  async listCompany () {
    if (!this.accessToken || !this.accessToken.isValid()) {
      throw new UnauthenticatedError('Authencation is necessary')
    }

    try {
      const { data } = await this.client.get('/company', {
        headers: {
          Authorization: `Bearer ${this.accessToken.token}`
        }
      })

      return data
    } catch (error) {
      throw new ResponseError(error?.response?.data?.message || error.message)
    }
  }

  async createCompany ({ name, document, address, point }) {
    if (!this.accessToken || !this.accessToken.isValid()) {
      throw new UnauthenticatedError('Authencation is necessary')
    }

    try {
      const { data } = await this.client.post('/company', {
        name,
        document,
        address,
        point
      }, {
        headers: {
          Authorization: `Bearer ${this.accessToken.token}`
        }
      })

      return data
    } catch (error) {
      throw new ResponseError(error?.response?.data?.message || error.message)
    }
  }

  async deleteCompany ({ id }) {
    if (!this.accessToken || !this.accessToken.isValid()) {
      throw new UnauthenticatedError('Authencation is necessary')
    }

    try {
      await this.client.delete(`/company/${id}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken.token}`
        }
      })
    } catch (error) {
      throw new ResponseError(error?.response?.data?.message || error.message)
    }
  }

  async importSheet ({ name, contentType, base64 }) {
    if (!this.accessToken || !this.accessToken.isValid()) {
      throw new UnauthenticatedError('Authencation is necessary')
    }

    try {
      const { data } = await this.client.post('/sale/import', {
        name,
        contentType,
        base64
      }, {
        headers: {
          Authorization: `Bearer ${this.accessToken.token}`
        }
      })

      return data
    } catch (error) {
      throw new ResponseError(error?.response?.data?.message || error.message)
    }
  }
}

export default new Client()
