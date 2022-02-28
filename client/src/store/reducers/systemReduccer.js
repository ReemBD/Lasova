const initialState = {
    userMsg: {
        txt: '',
        type: ''
    }
}

export function systemReducer(state = initialState, action) {
    switch (action.type) {
        case "UPDATE_USER_MSG":
            return {
                ...state,
                userMsg: {
                    txt: action.msg.txt,
                    type: action.msg.type
                }
            }
        default:
            return state;
    }
}