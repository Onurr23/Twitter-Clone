import axios from "axios";

export const loadUser=(id)=>{

    return async(dispatch)=>{

       await axios.get('http://192.168.1.106:5000/user/'+id).then((result)=>{
    
            dispatch({type : 'USER_LOADED',payload : result.data})
    
        }).catch(err=>{
    
            dispatch({type : 'USER_FAILED',payload : 'USER_FAILED'})
    
        })
    
        }

}

export const updateFollowing=(id,obj)=>{

    return async(dispatch)=>{

    axios.post('http://192.168.1.106:5000/'+id,obj).then(()=>{

        dispatch({type : 'FOLLOWING_UPDATED',payload : 'Updated'})

    }).catch(err=>{

        dispatch({type : 'USER_FAILED',payload : 'USER_FAILED'})

    })

    }

}


export const updateFollowers=(id,obj)=>{

    return async(dispatch)=>{

    axios.post('http://192.168.1.106:5000/otheruser/'+id,obj).then(()=>{

        dispatch({type : 'FOLLOWERS_UPDATED',payload : 'Updated'})

    }).catch(err=>{

        dispatch({type : 'USER_FAILED',payload : 'USER_FAILED'})

    })

    }

}

export default {loadUser,updateFollowing,updateFollowers};