import { combineReducers } from 'redux'
import userReducer from './WorkorderlistReducer'



export default combineReducers({
  users: userReducer
})