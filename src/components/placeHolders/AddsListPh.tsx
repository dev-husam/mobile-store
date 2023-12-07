import { Dimensions, StyleSheet, Animated, View } from 'react-native'

import { horizontalScale, verticalScale } from '../../helpers/Scalling';
import { AppColorsTheme2 } from '../../constants/Colors';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)




const AddsListPh = () => {

    return (
        <MotiView style={styles.sectionContainer}>
            <Skeleton colorMode="light" height={200} width={ITEM_WIDTH} />
        </MotiView>

    )
}

export default AddsListPh

const styles = StyleSheet.create({
    sectionContainer: {
        padding: horizontalScale(8),
        borderRadius: 10,
        marginVertical: verticalScale(10),
        marginHorizontal: horizontalScale(20),

    },
    card: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: AppColorsTheme2.secondary,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        height: 100,
        alignItems: "center",
        borderWidth: 2,
        borderColor: AppColorsTheme2.primary
    },

})