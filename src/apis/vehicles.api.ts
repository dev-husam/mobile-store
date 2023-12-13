import { AsyncStorageConstants } from "../constants/CommonConsstats";
import { getStorageValues } from "../helpers/AppAsyncStoreage";
import { AppApiPath } from "./apisPath";
import { makeApiCall } from "./axios.config";


export const getVehicleById = async (id: string) => {
    const response = await makeApiCall({ url: `/vehicles/${id}`, method: "get" })
    return response?.data
};

export const getAllVehicles = async () => {
    const userLocation = await getStorageValues(AsyncStorageConstants.userLocation)
    const response = await makeApiCall({ url: AppApiPath.vehiclesListApi, method: "get", params: JSON.parse(userLocation as string) })
    return response?.data?.list
};