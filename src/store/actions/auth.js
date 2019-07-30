import * as actionType from "./actionTypes"
import axios from "axios"

export const authStart =()=>{
  // setting loading state
  return {
  type: actionType.AUTH_START
  }
}

export const authSuccess =(authData)=>{
  return {
    type: actionType.AUTH_SUCCESS,
    payload:{
      token: authData.idToken,
      userId: authData.localId
    }
  }
}

export const authFail=(error)=>{
  return {
  type: actionType.AUTH_FAIL,
  payload:{
    error: error
  }
  }
}

export const auth=(email, password)=>{
  return (dispatch)=>{
  dispatch(authStart())
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  }
  // axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxKF1i9Y5ZpePYHC-Xp2mkTSocGsyDMHU",authData)
  axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_WEB_API}`,authData)
    .then(response=>{
        const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
        //expiry date is calculated. but needs to be converted to date again
        localStorage.setItem("token",response.data.idToken)
        localStorage.setItem("expirationDate",expDate)
        localStorage.setItem("userId",response.data.localId)
        dispatch(authSuccess(response.data))
        dispatch(checkAuthTimeout(response.data.expiresIn* 100))
    })
    .catch(error=>{
        dispatch(authFail("Please verify password and email"))
    })
  }
}

export const logout =()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("expirationDate")
  localStorage.removeItem("userId")
  return {
    type: actionType.LOGOUT
  }
}

export const checkAuthTimeout =(expirationTime)=>{
  return (dispatch)=>{
    setTimeout(()=>{
      dispatch(logout())
    }, expirationTime )
  }
}

export const setAuthRedirect =(path)=>{
  return {
    type: actionType.SET_AUTH_REDIRECT,
    payload: {
      path:path
    }
  }
}

export const authCheckState =()=>{
  return (dispatch)=>{
    const token = localStorage.getItem("token")
    if(!token){
      dispatch(logout())
    }else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"))
      if(expirationDate <= new Date()){
        dispatch(logout())
      }else{
        const userId = localStorage.getItem("userId")
        dispatch(authSuccess({idToken: token, localId: userId}))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getSeconds())/1000))
      }
    }
  }
}

export const register=(email, password)=>{
  return (dispatch)=>{
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_WEB_API}`,authData)
      .then(response=>{
          const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
          //expiry date is calculated. but needs to be converted to date again
          localStorage.setItem("token",response.data.idToken)
          localStorage.setItem("expirationDate",expDate)
          localStorage.setItem("userId",response.data.localId)
          dispatch(registrationSuccess(response.data))
      })
      .catch(error=>{
          dispatch(authFail(error.message))
      })
    }
}

const registrationSuccess =(authData)=>{
  return {
    type: actionType.AUTH_SUCCESS,
    payload:{
      token: authData.idToken,
      userId: authData.localId
    }
  }
}