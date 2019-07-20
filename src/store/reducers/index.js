import { combineReducers } from "redux"
import burger from "./burger"
import order from "./order"

const reducers = combineReducers({
    burger: burger,
    order: order
})

export default reducers