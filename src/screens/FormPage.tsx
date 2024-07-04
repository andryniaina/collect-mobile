import React, { memo, useState, version } from "react";
import { View, Text, StyleSheet } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useLocalForms } from "../services/forms/forms.hooks";
import { Navigation } from "../types";
import Button from "../components/Button";
import { insertFormDataToDatabase } from "../config/sqlite/db";
import { useLocalFormDatas } from "../services/formDatas/formDatas.hook";
import uuid from "react-native-uuid";

interface Props {
  navigation: Navigation;
  route: any;
}

const FormPage = ({ navigation, route }: Props) => {
  const [formDatas, setFormDatas] = useState<any>({});
  const formId = route.params.formId;
  const status = route.params.status;
  const { data: forms } = useLocalForms(); // Fetch forms from local cache
  const { data: formData } = useLocalFormDatas();

  let selectedForm: any;
  if (status === "fill") {
    // Find the selected form by formId
    console.log("Forms==>", JSON.stringify(forms));
    const Form = forms?.find((form) => form._id === formId);
    selectedForm = Form;
    if (!Form) {
      return <Text>Form not found!</Text>;
    }
  } else if (status === "draft") {
    // Find the selected form by formId
    console.log("Forms Data==>",JSON.stringify(formData));
    const Form = formData?.find((form: any) => form._id === formId);
    selectedForm = Form;
    if (!Form) {
      return <Text>Form not found!</Text>;
    }
  }

  const handleSave = async (formId: string) => {
    if (status === "fill") {
      await onSaveFill(formId);
    }else if (status==="draft") {
      await onSaveDraft();
    }
  };

  const handleReadyToSave = async (formId: string) => {
    if (status === "fill") {
      await onSaveFill(formId);
      await onReadyToSend();
    }else if (status==="draft") {
      await onReadyToSend();
    }
  };

  const onSaveFill = async (formId: string) => {
    try {
      console.log("Save to draft from FormId", formId);
      const { fields, ...rest } = selectedForm;
      const newId = uuid.v4();
      const currentDate = new Date().toISOString();
      const form = {
        ...rest,
        fields: fields.map((field: any) => ({
          ...field,
          data: formDatas[field.name]
        })),
        _id: newId,
        formId: formId,
        createdAt: currentDate,
        updatedAt: currentDate,
        status:"draft"
      };
      console.log("form==>", JSON.stringify(form));
      const response = await insertFormDataToDatabase(form);
      console.log("response==>", response);
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  const onSaveDraft = async () => {
    try {
      console.log("Save draft");
      const { fields, ...rest } = selectedForm;
      const currentDate = new Date().toISOString();
      const form = {
        ...rest,
        fields: fields.map((field: any) => ({
          ...field,
          data: formDatas[field.name]
        })),
        updatedAt: currentDate,
      };
      console.log("form==>", JSON.stringify(form));
      const response = await insertFormDataToDatabase(form);
      console.log("response==>", response);
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };
  const onReadyToSend = async () => {
    try {
      console.log("Save draft");
      const { fields, ...rest } = selectedForm;
      const form = {
        ...rest,
        fields: fields.map((field: any) => ({
          ...field,
          data: formDatas[field.name]
        })),
        status:"ready"
      };
      console.log("form==>", JSON.stringify(form));
      const response = await insertFormDataToDatabase(form);
      console.log("response==>", response);
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  return (
    <Background>
      <Header>{selectedForm.name}</Header>
      {selectedForm?.fields?.map((field: any) => (
        <InputField
          key={field._id}
          type={field.type}
          name={field.name}
          setFormDatas={setFormDatas}
          initialValue={field.data||""}
        />
      ))}
      <Button onPress={() => handleSave(formId)} mode="contained">
        Sauvegarder
      </Button>
      <Button onPress={()=>handleReadyToSave(formId)} mode="contained">Prèt à envoyer</Button>
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
