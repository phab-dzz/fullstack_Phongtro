import actionsTypes from "../actions/actionTypes"

const initState = {
    isLoggedIn: false,
    token: null,
    msg: '',
    update: false,
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionsTypes.REGISTER_SUCCESS:
        case actionsTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                msg: ''
            }
        case actionsTypes.REGISTER_FAIL:
        case actionsTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                msg: action.data,
                token: null,
                update: !state.update
            }
        case actionsTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: ''
            }
        default:
            return state
    }
}
export default authReducer