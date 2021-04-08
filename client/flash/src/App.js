import './App.css';
import { SideBar } from "./components/SideBar";
import { HomePage } from "./components/HomePage";
import {useState, useEffect} from "react";

function App() {

    const [page, setPage] = useState('homepage')
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [dividers, setDividers] = useState([]);

    useEffect(() => {
        updateDividers()
    }, [])

    function updateDividers() {
        fetch('http://localhost:8001/api/dividers', {
            mode: 'cors',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setDividers(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }


    if (error) {
        return <div>Error: {error.message}</div>;

    } else if (!isLoaded) {
        return <div className={"loading-screen"}><p>Loading...</p></div>;

    } else {
        return (
            <div className="App">
                <SideBar dividers={dividers}/>
                <HomePage dividers={dividers} updateDividers={updateDividers}/>
            </div>
        );
    }

}

export default App;
