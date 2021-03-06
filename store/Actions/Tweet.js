import axios from "axios";

export const getTweets=()=>{

    return async(dispatch)=>{

       
      await axios.get('http://192.168.1.106:5000/tweet').then((tweets)=>{
            
            dispatch({type :'TWEETS_LOADED',payload : tweets.data});

        }).catch(err=>{

            dispatch({type : 'TWEET_FAILED',payload : err})

        })

    }

}


export const createTweet=(tweet,user)=>{

    return(dispatch)=>{

        axios.post('http://192.168.1.106:5000/tweet/create',tweet).then((result)=>{

        user.tweets.push(result.data._id);

            axios.post('http://192.168.1.106:5000/user/'+user._id,user.tweets).then(()=>{

                dispatch({type :'TWEET_CREATED',payload : 'CREATED'})
                
            })

        }).catch(err=>{

            dispatch({type : 'TWEET_FAILED',payload : err})

        })

    }

}

export const updateTweet=(id,obj)=>{

   
    return(dispatch)=>{

        axios.post('http://192.168.1.106:5000/tweet/update/'+id,obj).then(()=>{
          
            dispatch({type :'TWEET_UPDATED',payload : 'UPDATED'})

        }).catch(err=>{

            dispatch({type : 'TWEET_FAILED',payload : err})

        })

    }

}

export const deleteTweet=(id)=>{

    return(dispatch)=>{

        axios.post('http://192.168.1.106:5000/tweet/delete/'+id).then(()=>{

            dispatch({type :'TWEET_DELETED',payload : 'DELETED'})

        }).catch(err=>{

            dispatch({type : 'TWEET_FAILED',payload : err})

        })

    }

}

export const getUserTweets=(id)=>{

    
    return async(dispatch)=>{
       
      await axios.get('http://192.168.1.106:5000/tweet/user/'+id).then((result)=>{
            
            dispatch({type :'USERTWEETS_LOADED',payload : result.data});
           
        }).catch(err=>{

            dispatch({type : 'TWEET_FAILED',payload : err})

        })

    }

}

export default {createTweet,updateTweet,deleteTweet,getTweets,getUserTweets};