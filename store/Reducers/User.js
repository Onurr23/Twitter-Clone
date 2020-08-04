const initialState={

    message : '',
    profile : {}

}

export const userReducer=(state=initialState,action)=>{

    if(action.type === 'USER_LOADED'){

        return{

            ...state,
            profile : action.payload

        }

    }else if(action.type === 'FOLLOWING_UPDATED' || action.type === 'FOLLOWERS_UPDATED'){

        return {

            ...state,
            message : action.payload

        }

    }else{

        return state;

    }

}

export default userReducer;