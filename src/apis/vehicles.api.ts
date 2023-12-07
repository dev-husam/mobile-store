import { client } from "./axios.config";


export const getVehicleById = async (id) => {
    const response = await client.get(`/vehicles/${id}`)
    return response.data.data
};