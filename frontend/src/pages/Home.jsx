import SearchForm from "../components/Home/SearchForm";
import { setProgress } from "../app/Slices/ProgressSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function Home() {
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

export default Home;
