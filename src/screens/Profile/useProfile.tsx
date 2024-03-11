import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { INavigationProps } from "../RootStackParams";

import * as Yup from "yup";
import { useMain } from "../../hooks/useMain";
import api from "../../lib/api";

interface FormStructure {
  name: string;
  email: string;
  password: string;
}

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
});

export default function useProfile() {
  const { goBack, navigate } = useNavigation<INavigationProps>();
  const { setUser, user } = useMain()

  const initialValues: FormStructure = {
    name: user.name,
    email: user.email,
    password: user.senha,
  };

  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleNavigateToHome = useCallback(() => {
    navigate("Home");
  }, [navigator]);

  const handleFormSubmit = (values: FormStructure) => {
    setUser({...user, senha: values.password, email: values.email, name: values.name})
    api.users.put({...user, senha: values.password, email: values.email, name: values.name})
    handleNavigateToHome();
  };

  return {
    initialValues,
    ProfileSchema,
    handleGoBack,
    handleFormSubmit,
  };
}
