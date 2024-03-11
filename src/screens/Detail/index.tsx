import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { Job } from "../../@types/job";
import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { INavigationProps } from "../RootStackParams";
import {
  Content,
  Description,
  Header,
  Splitter,
  Title,
  Wrapper,
} from "./styles";
import { Linking } from "react-native";

export default function Detail() {
  const route = useRoute();
  const job = route.params as Job;

  const { goBack } = useNavigation<INavigationProps>();

  const handleGoBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <Wrapper>
      <Header>
        <Button
          noSpacing
          title="< voltar"
          variant="secondary"
          onPress={handleGoBack}
        />
        <Logo />
      </Header>

      <Splitter />

      <Content>
        <Title>{job.titulo}</Title>
        <Description>{job.descricao}</Description>
        <Button title="Entrar em contato" onPress={() => {Linking.openURL('whatsapp://send?text=Me arrume um emprego.&phone=55' + job.telefone)}} />
      </Content>
    </Wrapper>
  );
}
