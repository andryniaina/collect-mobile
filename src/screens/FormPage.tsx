import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Background from '../components/Background'; 
import Header from '../components/Header'; 
import InputField from "../components/InputField"; 
import { useLocalForms } from '../services/forms/forms.hooks'; 
import { Navigation } from '../types';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker';

interface Props {
    navigation: Navigation,
    route: any
}

const FormPage = ({navigation,route}: Props) => {
  const formId = route.params.formId;
  const { data: forms } = useLocalForms(); // Fetch forms from local cache

  // Find the selected form by formId
  const selectedForm = forms?.find(form => form._id === formId);

  if (!selectedForm) {
    return <Text>Form not found!</Text>;
  }

  return (
    <Background>
      <Header>{selectedForm.name}</Header>
        {selectedForm.fields.map(field => (
          <InputField key={field._id} type={field.type} name={field.name} />
        ))}
        <Button mode="contained">
          Suivant
        </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default memo(FormPage);
