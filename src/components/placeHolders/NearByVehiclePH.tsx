// import { StyleSheet, View } from 'react-native'

// import React from 'react'
// import { horizontalScale, verticalScale } from '../../helpers/Scalling';
// import { MotiView } from 'moti';
// import { Skeleton } from 'moti/skeleton';


// const NearByVehiclePH = () => {
//     return (

//         <MotiView style={styles.sectionContainer}>
//             <MotiView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//                 <Skeleton colorMode="light" radius="round" height={20} width={120} />
//             </MotiView>
//             <Skeleton colorMode="light" height={120} width={300} />
//         </MotiView>



//     )
// }

// export default NearByVehiclePH

// const styles = StyleSheet.create({
//     sectionContainer: {
//         padding: 8,
//         borderRadius: 10,
//         marginVertical: verticalScale(10),
//         marginHorizontal: horizontalScale(20),

//     },
//     container: {
//         flexDirection: "row",
//         overflow: "hidden"
//     },

// })



import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'
import { Code } from 'react-content-loader'

import { AppColorsTheme2 } from '../../constants/Colors'
import { SLIDER_WIDTH } from '../ui/carousel-snap/CarouselCardItem'
import { StyleSheet, View } from 'react-native'
import { horizontalScale, verticalScale } from '../../helpers/Scalling'

const NearByVehiclePH = () => (
    <View style={styles.container}>
        <ContentLoader
            height={150}
            speed={2}
            // style={{ borderRadius: 20, overflow: "hidden" }}
            backgroundColor={AppColorsTheme2.primaryLight}
            foregroundColor={'#fff'}
            opacity={0.5}
        >
            <Path x={50} y={50} />
        </ContentLoader>
    </View>

)
export default NearByVehiclePH

const styles = StyleSheet.create({
    container: {
        padding: horizontalScale(8),
        marginHorizontal: horizontalScale(20),
    }
})
