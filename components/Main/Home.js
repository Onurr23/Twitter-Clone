import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Image,TextInput,FlatList,ActivityIndicator} from "react-native";
import colors from "../../constants/colors";
import {Ionicons,EvilIcons} from "@expo/vector-icons";
import * as tweetActions from "../../store/Actions/Tweet";
import {useSelector,useDispatch} from "react-redux";
import Colors from "../../constants/colors";

const Home=props=>{

    const {navigation} = props;
    const [tweet, setTweet] = useState('');
    const [loading, setloading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [color, setColor] = useState(Colors.gray)

    const user= useSelector(state=>state.auth.user);
    let tweets = useSelector(state=>state.tweet.tweets);
    const dispatch = useDispatch();

    useEffect(()=>{

        setloading(true);
        loadTweets();
        setloading(false);

    },[dispatch])

    const loadTweets=async()=>{

        setRefreshing(true);
       await dispatch(tweetActions.getTweets());
       setRefreshing(false);
        
    }

    const like=(id,currentLike)=>{

        if(didLike(currentLike)){

            setColor(colors.gray);

            let updatedLikes = currentLike.filter(c=>c !== user._id);

            dispatch(tweetActions.updateTweet(id,updatedLikes));


        }else{

            setColor("#E0245E");
            currentLike.push(user._id);
            dispatch(tweetActions.updateTweet(id,currentLike));

        }     

        

    }

    const tweetHandler=()=>{

       const newTweet = {

        context : tweet,
        userId : user._id,
        like : []

       }

       dispatch(tweetActions.createTweet(newTweet));
       setTweet('');
    
     
    }

    const didLike=(currentLike)=>{

        let liked = currentLike.filter(c=> c===user._id);

        if(liked.length>0){

            return true

        }else{

            return false;

        }

    }

    const renderTweets=({item})=>{

        return(
            <TouchableOpacity style={styles.tweet} onPress={()=>{navigation.navigate('TweetDetail',{item})}}>
            <View style={{flexDirection : 'row'}}>
            <Image source={{uri : item.userId.pic}} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.userInfo}>
                <Text style={styles.name}>{item.userId.name}</Text><Text style={styles.username}>@Onurr_23</Text>
                </View>
                <View style={styles.tweetContainer}>
                <Text style={styles.tweetText}>{item.context}</Text>
                </View>
            </View>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={()=>didLike(item.like)}>
                <EvilIcons name="comment" size={24} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity>
                <EvilIcons name="retweet" size={24} color={colors.gray} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tweetButtons} onPress={()=>like(item._id,item.like)}>
        { didLike(item.like) ? <View style={{flexDirection : 'row'}}><Ionicons name="md-heart" size={20} color="#E0245E" /><Text style={styles.like}>{item.like.length}</Text></View>:
                    <View style={{flexDirection : 'row'}}><Ionicons name="ios-heart-empty" size={20} color={color} /><Text style={styles.like}>{item.like.length}</Text></View>  
                    }
               
                </TouchableOpacity>
            </View>
            </TouchableOpacity>
        )

    }

    if(loading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.light}/>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.createTweet}>
            <TextInput placeholder="What is going on ?" placeholderTextColor={colors.gray} value={tweet} style={styles.input} onChangeText={text=>setTweet(text)} />
            <TouchableOpacity style={styles.tweetButton} onPress={()=>tweetHandler()}>
                <Text style={{color :'white'}}>Tweet</Text>
            </TouchableOpacity>
            </View>
            <FlatList data={tweets} onRefresh={loadTweets} refreshing={refreshing} renderItem={renderTweets} />
        </View>
    )

}

const styles = StyleSheet.create({

screen :{

    flex : 1,
    backgroundColor : colors.dark

},
centered: { 

     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor : colors.dark

    
    },
tweet : {

    width : '100%',
    padding : 10,
    borderBottomColor : colors.gray,
    borderBottomWidth :0.3,
    flexDirection : 'column'

},
image :{

    width : 50,
    height:50,
    borderRadius : 50
},

userInfo:{

    flexDirection : 'row',
    marginLeft : 15
},
name:{

    fontSize : 17,
    color : 'white',
    fontFamily : 'open-sans-bold'

},
username : {

    fontSize : 17,
    color : colors.gray,
    fontFamily : 'open-sans'
},
tweetContainer :{

    marginLeft : 15,
    width : '90%'

},
tweetText :{

    color : 'white',
    fontFamily : 'open-sans',

},

createTweet :{

    width : '100%',
    height : 60,
    padding : 5,
    marginBottom : 15
},
input : {

    width :'100%',
    height :'100%',
    color :colors.light,
    marginLeft : 15

},
tweetButton :{

    width : '20%',
    height : 25,
    backgroundColor : colors.light,
    borderRadius : 25,
    justifyContent : 'center',
    alignItems :'center',
    alignSelf :'flex-end'
},
buttons :{

    flexDirection :'row',
    justifyContent :'space-around'

},
tweetButtons :{

    flexDirection : 'row'

},
tweetButtonText:{

    color : Colors.gray,
    marginLeft : 10

},
like :{
    
    marginLeft : 5,
    color : colors.gray

}

})

export default Home;