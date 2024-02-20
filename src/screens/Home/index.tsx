import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
  Region,
  Callout
} from "react-native-maps";
import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { INavigationProps } from "../RootStackParams";
import { Container, Counter, Info, Wrapper, ModalView, ModalViewContainer, ButtonView, ButtonCancel, ButtonCreate } from "./styles";
import { Modal, Text } from "react-native";
import { LabelledInput } from "../../components/LabelledInput";
import { useSafeAreaFrame } from "react-native-safe-area-context";

interface PointProps {
  id: number;
  region: Region;
  title: string;
}

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState<Region>();
  const [marker, setMarker] = useState<PointProps[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [click, setClick] = useState<MapPressEvent>()

  useEffect(() => {
    if (Device.isDevice) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permissão negada");
          return;
        }

        let location = await Location.getCurrentPositionAsync();
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      })();
    } else {
      console.log("Você está em um emulador. A localização será emulada.");
      setCurrentLocation({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, []);

  const { navigate } = useNavigation<INavigationProps>();

  const counter = 337;

  const handleGoToProfile = useCallback(() => {
    navigate("Profile");
  }, []);

  const handleMapPress = useCallback((event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker(oldValues => {
      let id = 0
      for (let value of oldValues){
        if (value.id >= id){
          id = value.id + 1
        }
      }
      
      return [...oldValues,{id:id ,title: 'Estático',region:{
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}]});
  }, []);

  const CreateMarker = (event: MapPressEvent) => {
    setClick(event)
  }

  return (
    <Wrapper>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: "100%",
          height: "100%",
          flex: 4,
        }}
        initialRegion={currentLocation}
        onPress={handleMapPress}
        // onPress={() => setModalVisible(true)}
      >
        {marker && 
        marker.map(marke => <Marker key={marke.id} coordinate={marke.region}>
          <Callout onPress={() => navigate('Detail')}>
            <Text>{marke.title}</Text>
          </Callout>
        </Marker>)}
      </MapView>
      <Container>
        <Logo />
        <Counter>{counter} vagas encontradas</Counter>
        <Info>Clique no marcador para saber mais sobre a vaga.</Info>
        <Button title="Ver meus dados" onPress={handleGoToProfile} />
      </Container>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
      >
        <ModalView>
          <ModalViewContainer>
            <LabelledInput
              label="Digite o nome da empresa"
              // onChangeText={value => setVaue(value)}
            />
            <ButtonView>
              <ButtonCancel onPress={() => {setModalVisible(false)}}><Text>Cancelar</Text></ButtonCancel>
              <ButtonCreate onPress={() => {}}><Text>Criar</Text></ButtonCreate>
            </ButtonView>
          </ModalViewContainer>
        </ModalView>
      </Modal>
    </Wrapper>
  );
}
