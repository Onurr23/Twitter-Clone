import axios from "axios";

export const signIn=(user)=>{

    return async(dispatch)=>{

    
      await axios.post('http://192.168.1.106:5000/signin',user).then(result=>{
        
        if(result.data._id){

            dispatch({type:'SIGN_IN_SUCCESS',payload :result.data})

        }else{

            dispatch({type : 'SIGN_IN_FAIL', payload : result.data})

        }
           
        }).catch(err=>{

            console.log(err)

        })

    }


}

export const signUp=(name,pic,email,password)=>{

    let user = {

        name,
        pic,
        email,
        password

    }
    
    return(dispatch)=>{

    
        axios.post('http://192.168.1.106:5000/signup',user).then(result=>{

            dispatch({type :'SIGN_UP_SUCCESS',payload : result.data})

        }).catch(err=>{

            dispatch({type : 'SIGN_UP_FAIL',payload : err})

        })

    }

}

export default {signIn,signUp};