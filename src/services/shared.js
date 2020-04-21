import {useEffect, useRef} from 'react'

const useIsMountedRef = () => {
    const isMountedRef = useRef(null);
    useEffect(() => {
      isMountedRef.current = true;
      return () => isMountedRef.current = false;
    });
    return isMountedRef;
}

const dateFromSec = (timestamp) => {
    const date = new Date(parseInt(timestamp.seconds*1000, 10))
    return date.toLocaleDateString()
}

export default {useIsMountedRef, dateFromSec}