export function updateUserMsg(msg) {
    return async (dispatch) => {
        dispatch({ type: 'UPDATE_USER_MSG', msg })
    }
}