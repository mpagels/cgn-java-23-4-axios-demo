import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";

type Person = {
    id: string,
    first_name: string,
    last_name: string
}

function App() {

    const [data, setData] = useState<Person[]>([]);
    const [page, setPage] = useState(1);
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    function fetchData() {
        axios.get(`api/person`).then(response => {
            setData(response.data.data)
        })
    }

    function postData() {
        axios.post("https://reqres.in/api/users", {name, job}).then(response => console.log(response.data))
    }

    useEffect(() => {
        fetchData()
    },[page])

  return (
    <>
        <button onClick={fetchData}>Fetch data</button>
        <ul>
            {data.map(person => {
                return <li key={person.id}>{person.first_name} {person.last_name}</li>
            })}
        </ul>
        <ul className={"pagination"}>
            <li className={"item"} onClick={() => setPage(1)}>1</li>
            <li className={"item"} onClick={() => setPage(2)}>2</li>
        </ul>

        <label>Name</label>
        <input type={"text"} onChange={event => setName(event.target.value)} value={name} />
        <label>Job</label>
        <input type={"text"} onChange={event => setJob(event.target.value)} value={job} />
        <button onClick={postData}>Abschicken</button>
    </>
  )
}

export default App
