import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProgress } from "../app/Slices/ProgressSlice";
import Error from "../components/Error/Error";

function ErrorPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProgress(100));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main className="text-center mt-5">
            <Error />
        </main>
    );
}

export default ErrorPage;
