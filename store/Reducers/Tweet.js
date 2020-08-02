const initialState={

    tweetStatus :'',
    tweets : [],
    userTweets : []

}

export const tweetReducer=(state=initialState,action)=>{

    if(action.type === 'TWEET_CREATED' || action.type === 'TWEET_UPDATED' || action.type === 'TWEET_DELETED' || action.type === 'TWEET_FAILED'){

        return {

            ...state,
            tweetStatus : action.payload
        }

    }else if(action.type === 'TWEETS_LOADED'){

        return{
            ...state,
            tweets : action.payload
        }

    } else if(action.type === 'USERTWEETS_LOADED'){

        return{
            ...state,
            userTweets : action.payload
        }

    }else{

        return state;

    }

}

export default tweetReducer;