const initialState={

    message : '',
    user: {

    }

}

export const AuthReducer=(state=initialState,action)=>{

   if(action.type === 'SIGN_IN_SUCCESS'){

        return{

            ...state,
            user : action.payload

        }

   }else if(action.type === 'SIGN_IN_FAIL'){

        return{
            ...state,
            message : action.payload
        }

   }else if(action.type === 'SIGN_UP_SUCCESS'){

    return{

        ...state,
        user : action

    }

   }else if(action.type ==='SIGN_UP_FAIL'){

    return{

        ...state,
        message : action.payload
    }

   }else{

    return state;

   }

}

export default AuthReducer;