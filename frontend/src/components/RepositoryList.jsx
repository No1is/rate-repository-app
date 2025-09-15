import React from 'react'
import { FlatList, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from '../../router/RouterProvider';
import { useState } from 'react';
import { Menu, Provider, Icon, Searchbar } from 'react-native-paper';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
    anchor: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8,
      backgroundColor: 'transparent',
      borderRadius: 4,
    },
    menu: {
      left: '50%',
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 4,
      width: Dimensions.get('window').width * 0.5,
      elevation: 5,
    },
    selectItem: {
      fontStyle: 'italic',
      color: '#666',
      marginBottom: 8,
    },
    dimmedBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
    },
    searchBar: {
      backgroundColor: 'white',
      borderRadius: 4,
      marginHorizontal: 20,
      marginVertical: 10,
      elevation: 2,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    input: {
      color: theme.colors.textPrimary
    },
});

const items = [
  { id: 'latest', label: 'Latest repositories', value: { orderBy: 'CREATED_AT', orderDirection: 'DESC' } },
  { id: 'highest', label: 'Highest rated repositories', value: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' } },
  { id: 'lowest', label: 'Lowest rated repositories', value: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' } },
]

const MenuList = ({ filter, setFilter, visible, setVisible }) => {

  const toggle = () => {
    setVisible(!visible)
  };

  const label = items.find((item) => {
    return item.value.orderBy === filter.orderBy && item.value.orderDirection === filter.orderDirection
  })?.label 

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        contentStyle={styles.menu}
        onDismiss={toggle}
        anchor={
          <TouchableOpacity
            style={styles.anchor}
            onPress={toggle}
          >
            <Text style={styles.label}>{label}</Text>
            <Icon source={visible ? 'menu-up' : 'menu-down'} size={20} color={theme.colors.textPrimary} />      
          </TouchableOpacity>          
        }
      >
        <Text style={styles.selectItem}>Select an item...</Text>
        {items.map((item) => (
          <Menu.Item 
            key={item.id}
            onPress={() => { 
              setFilter(item.value)
              toggle()
            }}
            title={item.label}
            titleStyle={{ color: theme.colors.textPrimary }}
          />
        ))}
      </Menu>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [filter, setFilter] = useState(items[0].value)
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const { repositories, fetchMore } = useRepositories({ 
    first: 4,
    orderBy: filter.orderBy,
    orderDirection: filter.orderDirection,
    searchKeyword: search,
  });

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    const onEndReach = () => {
      fetchMore();
    };

  return (
    <Provider>
      <FlatList
        data={repositoryNodes}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item } ) => (
          <Link key={item.id} to={`/${item.id}`}>
            <RepositoryItem item={item} />
          </Link>
        )}
        ListHeaderComponent={
          <>
            <Searchbar 
              style={styles.searchBar}
              placeholder='Search'
              onChangeText={setSearch}
              value={search}
              inputStyle={styles.input}
              iconColor='black'
            />
            <MenuList setFilter={setFilter} filter={filter} visible={visible} setVisible={setVisible} />
          </>
        }
      />
      {visible && <View style={styles.dimmedBackground}/>}
    </Provider>
  )
};

export default RepositoryList