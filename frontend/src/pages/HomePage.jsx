import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProgress } from "../app/Slices/ProgressSlice";
import SearchForm from "../components/Home/SearchForm";
import "../components/Home/Home.css";

export function Component() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProgress(100));
    }, []);

    return (
        <main>
            <SearchForm />
        </main>
    );
}

Component.displayName = "HomePage";
