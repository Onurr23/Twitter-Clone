import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Image,TextInput,FlatList,ActivityIndicator} from "react-native";
import colors from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import * as tweetActions from "../../store/Actions/Tweet";
import {useSelector,useDispatch} from "react-redux";
import Colors from "../../constants/colors";

const Home=props=>{

    const [tweet, setTweet] = useState('');
    const [loading, setloading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

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

    const tweetHandler=()=>{

       const newTweet = {

        context : tweet,
        userId : user._id,
        like : 0

       }

       dispatch(tweetActions.createTweet(newTweet));
    
     
    }

    const renderTweets=({item})=>{

        return(
            <TouchableOpacity style={styles.tweet}>
            <Image source={{uri : item.userId.pic}} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.userInfo}>
                <Text style={styles.name}>{item.userId.name}</Text><Text style={styles.username}>@Onurr_23</Text>
                </View>
                <View style={styles.tweetContainer}>
                <Text style={styles.tweetText}>{item.context}</Text>
                </View>
                
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
            <TextInput placeholder="What is going on ?" placeholderTextColor={colors.gray} style={styles.input} onChangeText={text=>setTweet(text)} />
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
    flexDirection : 'row'

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
    color :colors.light

},
tweetButton :{

    width : '20%',
    height : 25,
    backgroundColor : colors.light,
    borderRadius : 25,
    justifyContent : 'center',
    alignItems :'center',
    alignSelf :'flex-end'
}

})

export default Home;