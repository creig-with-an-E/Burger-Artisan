import { combineReducers } from "redux"
import burger from "./burger"
import order from "./order"
import auth from "./auth"

const reducers = combineReducers({
    auth: auth,
    burger: burger,
    order: order
})

export default reducers