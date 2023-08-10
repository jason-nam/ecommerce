import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollOnChange = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout ( () => {
            window.scrollTo(0, 0);
        }, 0)
    }, [location]);
}

export default ScrollOnChange;