import actionTypes from "../actions/actionTypes";
const initState = {
    posts: [],
    msg: '',
    count: 0,
    newPosts: [],
    postById: {},
    postOfCurrent: [],
    postSearch: [],
    

}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS_LIMIT:
        case actionTypes.GET_POSTS:

            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0

            }
        case actionTypes.GET_NEW_POST:
            return {
                ...state,
                msg: action.msg || '',
                newPosts: action.newPosts || [],
            }
    
        case actionTypes.GET_POST_BY_ID:
            return {
                ...state,
                postById: action.post || {},
                msg: action.msg || ''
            }
        case actionTypes.GET_POST_OF_CURRENT:
            return {
                ...state,
                postOfCurrent: action.postOfCurrent || [],
                msg: action.msg || ''
            }
        case actionTypes.GET_POSTS_CREATED:
            return {
                ...state,
                
                msg: action.msg || ''
            }
        case actionTypes.GET_POSTS_SEARCH:
            return {
                ...state,
                postSearch: action.postSearch || [],
                msg: action.msg || ''
            }
            

        default:
            return state;
    }

}

export default postReducer