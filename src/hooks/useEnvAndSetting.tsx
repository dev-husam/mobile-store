import { StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import { API_URL, API_TOKEN, APP_CONFIG } from "@env"

const useEnvAndSetting = () => {
    const [env, setEnv] = useState(null)

    useEffect(() => {
        if (APP_CONFIG) {
            setEnv(APP_CONFIG)
        }

    }, [
        APP_CONFIG
    ])


    return {
        env,
        isDev: APP_CONFIG === "development"
    }
}

export default useEnvAndSetting

const styles = StyleSheet.create({})