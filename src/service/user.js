import fetch from './fetch'
import { session, sessionGroup } from './auth'
import { redirectToLogin, setLogout } from '../utils/util'

export const login = params => {
  return new Promise((resolve, reject) => {
    fetch.post('auth/login', params, false)
      .then(res => {
        if (res.success === false) {
          reject(res.message)
        } else {
          setLogout(false)
          resolve(res)
        }
      }, reject)
  })
}

export const logout = () => {
  session.clear()
  redirectToLogin()
}

export const registry = params => {
  return new Promise((resolve, reject) => {
    fetch.post('auth/register', params, false)
      .then(res => {
        if (res.success === false) {
          reject(res)
        } else {
          setLogout(false)
          resolve(res)
        }
      }, reject)
  })
}

export const sendMessage = params => {
  return new Promise((resolve, reject) => {
    fetch.get('auth/sendMessage', params, false)
      .then(res => {
        if (res.success === false) {
          reject(res.message)
        } else {
          resolve(res)
        }
      }, reject)
  })
}

export const checkAndSetSessionByUserId = userId => {
  return new Promise((resolve, reject) => {
    let curSession = sessionGroup.get(userId)
    if (curSession) {
      fetch('find/slide', {header: {'access-token': curSession.token}}).then(res => {
        session.set(curSession)
        resolve(curSession)
      }, reject)
    } else {
      logout()
      reject(null)
    }
  })
}

export const updateToken = () => {
  return fetch.get('update/token', {}, true, false)
}
