import React from "react";
import { Image } from "expo-image";

import * as S from "./style";

interface CategoryCardProps {
  text: string;
  image: string
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ text, image }) => {
  return (
    <S.Container>
      <Image
        source={image}
        transition={100}
        style={{
          width: '100%',
          height: 91,
          marginTop: 16,
          display: "flex",
          position: 'absolute'
        }}
        contentFit="cover"
      />
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};
