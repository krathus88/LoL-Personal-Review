import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProgress } from "../app/Slices/progressSlice";
import SearchForm from "../components/Home/SearchForm";
import "../components/Home/Home.css";

function HomePage() {
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

export default HomePage;
