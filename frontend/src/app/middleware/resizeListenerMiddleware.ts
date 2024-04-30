import { Middleware } from "redux";
import { setIsMobile } from "../Slices/IsMobileSlice";

export const resizeListenerMiddleware: Middleware = (store) => {
    let prevIsMobile = window.innerWidth <= 767;

    const handleResize = () => {
        const isMobile = window.innerWidth <= 767;
        if (prevIsMobile !== isMobile) {
            store.dispatch(setIsMobile(isMobile));
            prevIsMobile = isMobile;
        }
    };

    window.addEventListener("resize", handleResize);

    return (next) => (action) => {
        return next(action);
    };
};
