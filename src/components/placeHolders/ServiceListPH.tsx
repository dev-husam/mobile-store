// import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

// import React, { useEffect } from 'react'
// import { MotiView } from 'moti';
// import { Skeleton } from 'moti/skeleton';
// import { horizontalScale, verticalScale } from '../../helpers/Scalling';



// const ServiceListPH = () => {
//     const colorMode = 'light';

//     return (
//         <Pressable style={styles.container}>
//             <MotiView style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
//                 <Skeleton colorMode="light" radius="round" height={20} width={120} />
//             </MotiView>
//             <MotiView
//                 transition={{
//                     type: 'timing',
//                 }}
//                 // style={[styles.container]}
//                 animate={{ backgroundColor: '#ffffff' }}
//             >
//                 <FlatList horizontal data={[1, 2, 3, 4]} renderItem={({ index, item }) => {
//                     return (<View style={{ marginHorizontal: horizontalScale(10) }}>
//                         <Skeleton key={index} colorMode="light" radius="round" height={80} width={80} />
//                         <Spacer />
//                     </View>
//                     )
//                 }} />




//             </MotiView>
//         </Pressable>

//     )
// }

// export default ServiceListPH

// const Spacer = ({ height = 16 }) => <View style={{ height }} />;

// const styles = StyleSheet.create({
//     container: {
//         padding: 8,
//         borderRadius: 10,
//         marginVertical: verticalScale(10),
//         marginHorizontal: horizontalScale(20),
//         backgroundColor: "white"
//     },

// });
