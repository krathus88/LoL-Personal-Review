import { setIsMobile } from "../app/Slices/IsMobileSlice";

const resizeListenerMiddleware = (store) => {
    const handleResize = () => {
        const isMobile = window.innerWidth <= 767;
        store.dispatch(setIsMobile(isMobile));
    };

    window.addEventListener("resize", handleResize);

    return (next) => (action) => {
        return next(action);
    };
};

export default resizeListenerMiddleware;
