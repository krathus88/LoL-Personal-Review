import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProgress } from "../app/Slices/ProgressSlice";
import "../components/Home/Home.css";
import { SearchForm } from "../components/Home/SearchForm";

export function Component() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProgress(100));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main>
            <SearchForm />
        </main>
    );
}

Component.displayName = "HomePage";
