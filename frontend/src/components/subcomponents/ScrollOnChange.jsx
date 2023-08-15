import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollOnChange = () => {
    const location = useLocation();

    useEffect(() => {
        let scrollTimeout = setTimeout ( () => {
            window.scrollTo(0, 0);
        }, 0)

        return () => clearTimeout(scrollTimeout)
    }, [location]);
}

export default ScrollOnChange;