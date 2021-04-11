import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { HomePage } from "./components/HomePage";
import {ExplorePage} from "./components/ExplorePage";
import {useState, useEffect} from "react";

function App() {

    const [page, setPage] = useState('homepage')
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState('false');
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
                    setIsLoaded('true');
                    setDividers(result);
                },
                (error) => {
                    setIsLoaded('true');
                    setError(error);
                }
            )
    }


    if (error) {
        return <div>Error: {error.message}</div>;

    } else if (isLoaded === 'false') {
        return <div className={"loading-screen"}><p>Loading...</p></div>;

    } else {
        return (
            <Router>
                <div className="App">
                    <SideBar dividers={dividers} contentLoaded={isLoaded} />
                    <Switch>
                        <Route exact path={'/'}>
                            <HomePage className={"content"} dividers={dividers} updateDividers={updateDividers}/>
                        </Route>
                        <Route exact path={'/explore'}>
                            <ExplorePage className={"content"} dividers={dividers} updateDividers={updateDividers}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }

}

export default App;
