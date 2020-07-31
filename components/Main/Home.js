import React,{useState,useEffect} from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Image,TextInput,FlatList,ActivityIndicator,Keyboard} from "react-native";
import colors from "../../constants/colors";
import {Ionicons,EvilIcons} from "@expo/vector-icons";
import * as tweetActions from "../../store/Actions/Tweet";
import {useSelector,useDispatch} from "react-redux";
import Colors from "../../constants/colors";
import Tweet from "./Tweet";

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

    const tweetHandler=()=>{

       const newTweet = {

        context : tweet,
        userId : user._id,
        like : [],
        comments : []

       }

       dispatch(tweetActions.createTweet(newTweet));
       setTweet('');
    
    }

    const renderTweets=({item})=>{
        return(
            <Tweet item={item} navigation={navigation} />
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

tweetButtonText:{

    color : Colors.gray,
    marginLeft : 10

}

})

export default Home;