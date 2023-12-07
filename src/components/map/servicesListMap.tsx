import { FlatList } from 'react-native'
import React from 'react'
import ServiceDetail from './ServiceDetail'
import { ServiceDummy } from '../../constants/data'
import { useServicesStore } from '../../store/services.store'
import MapServiceListPh from '../placeHolders/MapServiceListPH'

const ServicesListMap = ({ selectedServiceId, setActiveServiceId }) => {
    const services = useServicesStore((state) => state.services)
    if (!services || services.length == 0) {
        return (
            <MapServiceListPh />
        )
    }

    return (
        <FlatList
            data={services ? services : ServiceDummy}
            horizontal
            contentContainerStyle={{
                paddingHorizontal: 10,
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <ServiceDetail
                    onPress={setActiveServiceId}
                    service={item}
                    activeService={selectedServiceId}
                // setSelectedTruckId={setSelectedTruckId}
                />
            )}
        />

    )
}

export default ServicesListMap

