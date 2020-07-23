import React from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Image,TextInput} from "react-native";
import colors from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";

const Home=props=>{

    return(
        <View style={styles.screen}>
            <View style={styles.createTweet}>
            <TextInput placeholder="What is going on ?" placeholderTextColor={colors.gray} style={styles.input} />
            <TouchableOpacity style={styles.tweetButton}>
                <Text style={{color :'white'}}>Tweet</Text>
            </TouchableOpacity>
            </View>
            <ScrollView>
            <TouchableOpacity style={styles.tweet}>
            <Image source={{uri : 'https://pbs.twimg.com/profile_images/1206237605806985221/pW65Z4C9_400x400.jpg'}} style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.userInfo}>
                <Text style={styles.name}>Ønur</Text><Text style={styles.username}>@Onurr_23</Text>
                </View>
                <View style={styles.tweetContainer}>
                <Text style={styles.tweetText}>Wasted times I spent with someone else
                She wasn't even half of you
                Reminiscin' how you felt
                And even though you put my life through hell</Text>
                </View>
                
            </View>
            </TouchableOpacity>
            </ScrollView>
            
        </View>
    )

}

const styles = StyleSheet.create({

screen :{

    flex : 1,
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