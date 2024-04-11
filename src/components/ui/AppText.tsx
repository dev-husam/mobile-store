import React, {ReactNode} from 'react';
import {Text, TextStyle, View, ViewStyle, TextProps} from 'react-native';
import {useLanguage} from '../../hooks/useLanguage.hook';
import {AppSizes} from '../../constants/Sizes';
import {AppColorsTheme2} from '../../constants/Colors';
import {AppFonts} from '../../constants/fonts';

interface AppTextProps extends TextProps {
  onPress?: () => void;
  nlines?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  children: ReactNode;
  size?: number;
  textStyle?: TextStyle;
  style?: ViewStyle;
  color?: string;
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
}

const AppText = ({
  onPress,
  weight = 'normal',
  children,
  size = AppSizes.medium,
  color = AppColorsTheme2.black,
  textStyle,
  style,
  alignItems = 'flex-start',
  nlines,
  ...restProps
}: AppTextProps) => {
  const {isArabic} = useLanguage();

  return (
    <View style={[{justifyContent: 'center', alignItems}, style]}>
      <Text
        onPress={onPress}
        numberOfLines={nlines}
        style={[
          {
            fontFamily: AppFonts.Roboto_Med,
            fontSize: size,
            color,
            fontWeight: weight,
            textAlign: isArabic ? 'left' : 'auto',
          },
          textStyle && textStyle,
        ]}
        {...restProps}>
        {children}
      </Text>
    </View>
  );
};

export default AppText;
