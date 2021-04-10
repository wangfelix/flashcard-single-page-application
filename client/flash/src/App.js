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
                        <Route exact path={'/hi'}>
                            <div className={"content"}><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequatur dignissimos
                                doloribus ducimus, earum eius eligendi est excepturi, fugiat incidunt inventore iste nam odit
                                pariatur, porro qui saepe tenetur vel vitae voluptatem! Amet assumenda aut dolorem doloremque
                                doloribus dolorum error impedit ipsa iste, labore molestias omnis praesentium quas repellat suscipit
                                ut voluptatibus. Eum explicabo id necessitatibus odit omnis, perferendis repellendus sunt
                                voluptatum. Accusamus alias id illum ipsa modi mollitia, nostrum officia perferendis sunt voluptate?
                                Aliquid aspernatur assumenda beatae blanditiis, corporis eveniet fuga laudantium nemo nobis
                                perferendis quae quia quidem, repellendus ullam ut vero voluptates. Dolorum iste maiores qui
                                quibusdam ratione!Lorem2sfewvfvekbmnwkgnbrknrbnrinrinrinbiewnbirnbirnbirnbirb</p></div>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }

}

export default App;
