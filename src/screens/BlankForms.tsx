import React, {memo} from 'react';
import Background from '../components/Background';
import {Navigation} from '../types';
import {useLocalForms} from '../services/forms/forms.hooks';
import {Text} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import { useLocalFormDatas, useLocalFormReadyDatas, useLocalFormSentDatas } from '../services/formDatas/formDatas.hook';
import { insertFormDataToDatabase } from '../config/sqlite/db';
import { sendFormsDataToServer } from '../services/formDatas';
import uuid from "react-native-uuid";

type Props = {
  navigation: any;
  route: any
};

const Dashboard = ({navigation,route}: Props) => {
  const {data: forms, isLoading, error} = useLocalForms();
  const {data: formDatas} = useLocalFormDatas();
  const {data:formReadyDatas}=useLocalFormReadyDatas();
  const {data:formSentDatas} = useLocalFormSentDatas()
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
  }else if(status==="ready"){
    formsValue=  formReadyDatas;
  }else if (status==="sent") {
    formsValue = formSentDatas;
  }

  const handleFormPress = async (formId: string) => {
    if (status==="fill" || status==="draft") {
      navigation.navigate('FormPage', {formId,status}); 
    }else if (status==="ready") {
      await onHandleSend(formId);
    }else if(status==="sent"){
      console.log("sent");
    }
  };

  const onSendToServer=async(form:any)=>{
    try {
      const response = await sendFormsDataToServer(form);
      return response;
    } catch (error) {
      console.log('error on sending data ',error);
    }
  }

  const onHandleSend = async (formId:string) => {
    try {
      console.log("Send ready");
      const Form = formReadyDatas?.find((form: any) => form._id === formId);
      const { fields, ...rest } = Form;
      const form = {
        ...rest,
        fields: fields.map((field: any) => ({
          ...field,
          data: formDatas[field.name]
        })),
        status:"sent"
      };
      console.log("form==>", JSON.stringify(form));
      const newId = uuid.v4();
      const formToSend :any = {
        _id:newId,
        formId:form.formId,
        data:JSON.stringify(form.fields),
      }
      const serverResponse = await onSendToServer(formToSend);
      if (serverResponse) {
        const response = await insertFormDataToDatabase(form);
        console.log("response==>", response);
      }
    } catch (error) {
      console.error("Error saving form:", error);
    }
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
