import {ViewStyle} from 'react-native';
import {AppColorsTheme2} from './Colors';

const centerContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: AppColorsTheme2.offWhite,
};

export const AppBoxShadow: ViewStyle = {
  shadowColor: '#171717',
  shadowOffset: {width: 2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3,
};
