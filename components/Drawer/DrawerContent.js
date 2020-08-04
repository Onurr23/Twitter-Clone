import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Caption, Drawer, Paragraph, Switch, Text, Title, TouchableRipple } from 'react-native-paper';
import colors from '../../constants/colors';
import { color } from 'react-native-reanimated';
import {useSelector} from "react-redux";
import { useNavigation } from '@react-navigation/native';

export function DrawerContent(props) {

   
    const user = useSelector(state=>state.auth.user);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                user.pic,
            }}
            size={50}
          />
          <Title style={styles.title}>{user.name}</Title>
          <Caption style={styles.caption}>{"@"+user.name+"23"}</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color='white'
                size={size}
              />
            )}
            label="Profile"
            labelStyle={{color : 'white'}}
            onPress={() => {navigation.navigate('Profile')}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color="white" size={size} />
            )}
            label="Preferences"
            labelStyle={{color : 'white'}}
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="bookmark-outline"
                color="white"
                size={size}
              />
            )}
            label="Bookmarks"
            labelStyle={{color : 'white'}}
            onPress={() => {}}
          />
        </Drawer.Section>
       
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text style={{color : 'white'}}>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          
        
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    color : 'white'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color : 'white'
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
});

export default DrawerContent;