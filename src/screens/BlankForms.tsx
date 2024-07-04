import React, {memo} from 'react';
import Background from '../components/Background';
import {Navigation} from '../types';
import {useLocalForms} from '../services/forms/forms.hooks';
import {Text} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { useLocalFormDatas } from '../services/formDatas/formDatas.hook';

type Props = {
  navigation: any;
  route: any
};

const Dashboard = ({navigation,route}: Props) => {
  const {data: forms, isLoading, error} = useLocalForms();
  const {data: formDatas} = useLocalFormDatas();
  const status = route.params.status;
  let formsValue;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading forms: {error.message}</Text>;
  }

  if (status==="fill") {
    formsValue = forms;
  }else if (status==="draft") {
    formsValue = formDatas;
  }

  const handleFormPress = (formId: string) => {
    navigation.navigate('FormPage', {formId,status});
  };

  return (
    <Background>
      <View style={styles.container}>
        <FlashList
          data={formsValue}
          keyExtractor={(item:any) => item._id}
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
