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
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;

    } else if (!isLoaded) {
        return <div>Loading...</div>;

    } else {
        return (
            <div className="App">
                <SideBar dividers={dividers}/>
                <HomePage dividers={dividers}/>
            </div>
        );
    }

}

export default App;
