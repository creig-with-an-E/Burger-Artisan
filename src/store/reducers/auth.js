import * as actionTypes from "../actions/actionTypes"

const INITIAL_STATE ={
  token:null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath:"/"
}

const reducer =(state=INITIAL_STATE, action)=>{
  switch(action.type){
    case actionTypes.AUTH_START:
      return {...state,loading: true, error: null}
    case actionTypes.AUTH_SUCCESS:
      const {token, userId} = action.payload
      return {...state, loading: false, token: token, userId: userId, error: null}
    case actionTypes.AUTH_FAIL:
      const error = action.payload.error
      return {...state, error: error, loading: false}
    case actionTypes.LOGOUT:
      console.log("logged out reducer")
      return {...state,token: null, userId: null}
    case actionTypes.SET_AUTH_REDIRECT:
      return {...state, authRedirectPath:action.payload.path}
    default: 
      return state
  }
}

export default reducer