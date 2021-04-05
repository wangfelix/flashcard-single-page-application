import './App.css';
import { SideBar } from "./components/SideBar";
import {useState} from "react";

function App() {

    const [page, setPage] = useState('homepage')

    return (
    <div className="App">
      <SideBar/>
    </div>
    );
}

export default App;
