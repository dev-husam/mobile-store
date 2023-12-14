import { useEffect, useState } from "react";



export const useCounter = () => {

    const [counter, setCounter] = useState(0)

    useEffect(() => {
        if (counter > 0) {
            setTimeout(() => {
                setCounter(counter - 1);
            }, 1000);
        }
    }, [counter]);


    return { counter, setCounter }

}