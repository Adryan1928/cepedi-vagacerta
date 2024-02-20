import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;

  width: 100%;
  padding: 16px;
  gap: 16px;

  background-color: #ecfffb;
`;

export const Counter = styled.Text`
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  text-align: left;
`;

export const Info = styled.Text`
  font-size: 14px;
  line-height: 16px;
  text-align: left;
`;

export const ModalView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const ModalViewContainer = styled.View`
  background-color: white;
  width: 80%;
  border-radius: 20px;
  padding: 40px 30px 40px 30px;
  align-items: 'center';
  gap: 12px;
  /* eleva: 5; */
`
export const ButtonView = styled.View`
  gap: 12px;
  flex-direction: row;
  justify-content: space-between;
`

export const ButtonCancel = styled.TouchableOpacity`
  padding: 12px;
  background-color: red;
  border-radius: 8px;
`

export const ButtonCreate = styled.TouchableOpacity`
  padding: 12px;
  background-color: green;
  border-radius: 8px;
`