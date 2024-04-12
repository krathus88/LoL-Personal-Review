import { setIsMobile } from "../../app/Slices/isMobileSlice";

const resizeListenerMiddleware = (store) => {
    const handleResize = () => {
        const isMobile = window.innerWidth <= 768;
        store.dispatch(setIsMobile(isMobile));
    };

    window.addEventListener("resize", handleResize);

    return (next) => (action) => {
        return next(action);
    };
};

export default resizeListenerMiddleware;
