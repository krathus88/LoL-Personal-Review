import SearchForm from "../components/Home/SearchForm";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

function Home() {
    return (
        <>
            <Header />
            <main>
                <SearchForm />
            </main>
            <Footer />
        </>
    );
}

export default Home;
