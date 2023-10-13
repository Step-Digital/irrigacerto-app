import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Typography } from "../../components/typography";
import { AntDesign } from '@expo/vector-icons'; 
import { Image } from "expo-image";
import { MaterialIcons } from '@expo/vector-icons'; 
import { strings } from "../../../utils";

import * as S from './styles';
import { Button } from '../button';

export const OnboardingModal = () => {
  const [progressActive, setProgessActive] = useState(1);
  const [showModal, setShowModal] = useState(true);

  return (
    <Modal
      animationType="slide"
      visible={showModal}
      transparent={true}
      onRequestClose={() => {}}
      presentationStyle="overFullScreen"
    >
      <S.Container>
        <S.TitleContainer>
          <Typography
            style={{
              width: 260,
              textAlign: "center",
              fontFamily: 'Poppins-regular',
              fontSize: 18,
            }}
            color="positive"
            size="normal"
            weight="bold"
          >
            {strings.modal.title}
          </Typography>
          <S.CloseModalButton onPress={() => setShowModal(false)}>
            <AntDesign name="close" size={24} color="gray" />
          </S.CloseModalButton>
        </S.TitleContainer>
        {progressActive === 1 && 
          (
            <S.Content>
              <S.ImgContainer>
                <Image
                  source={require("../../../../assets/onboarding1.png")}
                  transition={1000}
                  style={{
                    width: 260,
                    height: 194,
                    marginTop: 16,
                  }}
                  contentFit="cover"
                />
              </S.ImgContainer>
              <Typography
                style={{
                  width: 260,
                  textAlign: "center",
                  fontFamily: 'Poppins-regular',
                  fontSize: 14,
                  marginTop: 16,
                }}
                color="gray-8"
                size="normal"
                weight="medium"
              >
              {strings.modal.onboarding1.text1}
              </Typography>
              <Typography
                style={{
                  width: 280,
                  textAlign: "center",
                  fontFamily: 'Poppins-regular',
                  fontSize: 14,
                }}
                color="gray-8"
                size="normal"
                weight="medium"
              >
              <S.TextBold>{strings.modal.onboarding1.text2}</S.TextBold> {strings.modal.onboarding1.text3}
              </Typography>
          </S.Content>
        )
      }
      {progressActive === 2 && 
          (
            <S.Content>
              <S.ImgContainer>
                <Image
                  source={require("../../../../assets/onboarding2.png")}
                  transition={1000}
                  style={{
                    width: 201,
                    height: 194,
                    marginTop: 16,
                    display: 'flex',
                  }}
                  contentFit="cover"
                />
                </S.ImgContainer>
              <Typography
                style={{
                  width: 260,
                  textAlign: "center",
                  fontFamily: 'Poppins-regular',
                  fontSize: 14,
                  marginTop: 16,
                }}
                color="gray-8"
                size="normal"
                weight="medium"
              >
               {strings.modal.onboarding2}
              </Typography>
          </S.Content>
        )
      }
       {progressActive === 3 && 
          (
            <S.Content>
              <S.ImgContainer>
                <Image
                  source={require("../../../../assets/onboarding3.png")}
                  transition={1000}
                  style={{
                    width: 250,
                    height: 194,
                    marginTop: 16,
                    display: 'flex',
                  }}
                  contentFit="cover"
                />
                </S.ImgContainer>
              <Typography
                style={{
                  width: 260,
                  textAlign: "center",
                  fontFamily: 'Poppins-regular',
                  fontSize: 14,
                  marginTop: 16,
                }}
                color="gray-8"
                size="normal"
                weight="medium"
              >
                {strings.modal.onboarding3}
              </Typography>
          </S.Content>
        )
      }
       {progressActive === 4 && 
          (
            <S.Content>
              <S.ImgContainer>
                <Image
                  source={require("../../../../assets/onboarding4.png")}
                  transition={1000}
                  style={{
                    width: 181,
                    height: 194,
                    marginTop: 16,
                    display: 'flex',
                  }}
                  contentFit="cover"
                />
                </S.ImgContainer>
              <Typography
                style={{
                  width: 260,
                  textAlign: "center",
                  fontFamily: 'Poppins-regular',
                  fontSize: 14,
                  marginTop: 16,
                }}
                color="gray-8"
                size="normal"
                weight="medium"
              >
                {strings.modal.onboarding4}
              </Typography>
          </S.Content>
        )
      }
        <S.Footer>
          <S.FooterContent>
            <S.ProgressBarContainer>
              <S.ProgressBar active={progressActive === 1} />
              <S.ProgressBar active={progressActive === 2} />
              <S.ProgressBar active={progressActive === 3} />
              <S.ProgressBar active={progressActive === 4} />
            </S.ProgressBarContainer>
            <S.ButtonsContainer>
              <S.LeftButton
                disabled={progressActive === 1}
                activeButton={progressActive === 1 ? false : true}
                onPress={() => setProgessActive(progressActive - 1)}
              >
                <MaterialIcons name="arrow-left" size={32} color={progressActive === 1 ? 'black' : 'white'} />
              </S.LeftButton>
              <S.RightButton 
                activeButton={progressActive === 4 ? false : true}
                disabled={progressActive === 4}
                onPress={() => setProgessActive(progressActive + 1)}
              >
                <MaterialIcons name="arrow-right" size={32} color={progressActive === 4 ? 'black' : 'white'} />
              </S.RightButton>
            </S.ButtonsContainer>
          </S.FooterContent>

          {progressActive === 4 && (
           <Button 
            bg-color='positive'
            style={{ display: 'flex', width: '100%', marginTop: 16, height: 44}}
            onPress={() => setShowModal(false)}
          >
            <Typography
              style={{
                fontFamily: 'Poppins-regular',
                fontSize: 14,
                textAlign: 'center'
              }}
              color="pure-white"
              size="normal"
              weight="bold"
              >
              {strings.modal.button}
            </Typography>
          </Button>
          )}
        </S.Footer>
      </S.Container>
    </Modal>
  );
};
