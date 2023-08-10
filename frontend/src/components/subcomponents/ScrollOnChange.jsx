import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollOnChange = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout ( () => {
            window.scrollTo(0, 0);
        }, 1)
    }, [location]);
}

export default ScrollOnChange;