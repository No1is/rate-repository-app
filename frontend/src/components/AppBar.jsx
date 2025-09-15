import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme'
import AppBarTab from './AppBarTab'
import { useQuery } from '@apollo/client';
import { USER } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage';
import { useEffect, useState } from 'react';
import { useNavigate } from '../../router/RouterProvider';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.backgroundColor.primary,
        alignItems: 'flex-end',
        minHeight: 100,
        maxHeight: 100
    },
    signOut: {
      color: 'white',
      fontWeight: theme.fontWeights.bold
    }
});

const AppBar = () => {
  const [user, setUser] = useState(null)
  const { data, loading, refetch } = useQuery(USER, {
      fetchPolicy: 'cache-and-network'
  })
  const authStorage = useAuthStorage()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && data) {
      setUser(data?.me?.username)
    }
  }, [data, loading])

  const logOut = async () => {
    if (authStorage) {
      try {
        await authStorage.removeAccessToken();
        setUser(null)
        navigate('/')
        refetch()
        
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tab={'Repositories'} />
        {user
        ? (
          <>
            <AppBarTab tab={'Create a review'} />
            <AppBarTab tab={'My Reviews'} /> 
            <Pressable style={{ padding: 15 }} onPress={logOut}>
              <Text style={styles.signOut}>Log Out</Text>
            </Pressable>
          </>
        ): (
          <>
            <AppBarTab tab={'Sign In'} />
            <AppBarTab tab={'Sign Up'} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;