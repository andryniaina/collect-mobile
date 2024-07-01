import React, {memo} from 'react';
import Background from '../components/Background';
import {Navigation} from '../types';
import {useLocalForms} from '../services/forms/forms.hooks';
import {Text} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
type Props = {
  navigation: any;
};

const Dashboard = ({navigation}: Props) => {
  const {data: forms, isLoading, error} = useLocalForms();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading forms: {error.message}</Text>;
  }

  const handleFormPress = (formId: string) => {
    navigation.navigate('FormPage', {formId});
  };

  return (
    <Background>
      <View style={styles.container}>
        <FlashList
          data={forms}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleFormPress(item._id)}>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemText}>{item.version}</Text>
                <Text style={styles.itemText}>
                  {new Date(item.updatedAt).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          estimatedItemSize={100}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default memo(Dashboard);
