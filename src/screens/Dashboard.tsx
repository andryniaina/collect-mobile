import React, { memo, useCallback, useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import { fetchFormsFromServerAndDownload } from "../services/forms";
import { useQueryClient } from "@tanstack/react-query";
import { getFormDatasDraft, getFormDatasPreSend, getFormDatasSent } from "../services/formDatas";

type Props = {
  navigation: any;
  route:any;
};

const Dashboard = ({ navigation,route }: Props) => {

  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const fetchForms = async () => {
    setIsLoading(true);
    await fetchFormsFromServerAndDownload();
    queryClient.invalidateQueries({ queryKey: ["localForms"] }); // Invalidate the cache
    setIsLoading(false);
  };

  const fetchFormDatas = async () => {
    setIsLoading(true);
    await getFormDatasDraft();
    queryClient.invalidateQueries({ queryKey: ["localFormDatas"] }); // Invalidate the cache
    setIsLoading(false);
  };

  const fetchFormReadyDatas = async () => {
    setIsLoading(true);
    await getFormDatasPreSend();
    queryClient.invalidateQueries({ queryKey: ["localFormReadyDatas"] }); // Invalidate the cache
    setIsLoading(false);
  };

  const fetchFormSentDatas = async () => {
    setIsLoading(true);
    await getFormDatasSent();
    queryClient.invalidateQueries({ queryKey: ["localFormSentDatas"] }); // Invalidate the cache
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFormDatas();
    fetchFormReadyDatas();
    fetchFormSentDatas();
  }, []);

  return (
    <Background>
      <Logo />
      <Header>Let’ start</Header>
      <Button mode="outlined" onPress={() => navigation.navigate("BlankForms",{status:"fill"})}>
        Fill forms
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("BlankForms",{status:"draft"})}
      >
        Drafts
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("BlankForms",{status:"sent"})}>
        Sent
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate("BlankForms",{status:"ready"})}>
        Send forms data
      </Button>
      <Button mode="outlined" loading={isLoading} onPress={fetchForms}>
        Download forms
      </Button>
    </Background>
  );
};

export default memo(Dashboard);
