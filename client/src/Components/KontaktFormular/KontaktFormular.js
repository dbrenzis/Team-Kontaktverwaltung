import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"

const axios = require('axios')

export default function Kontaktformular() {

    //States
    const [kontakt, setKontakt] = useState(
        {
            vorname: "",
            nachname: "",
            mailadresse: "",
            telefonnummer: "",
            mitarbeiterid: "default"

        }
    )
    const [mitarbeiter, setmitarbeiter] = useState(null)
    const [error, seterror] = useState(null)


    //Hooks
    const history = useHistory()

    useEffect(() => {

        const fetchKontakt = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/mitarbeiter`)
                setmitarbeiter(response.data)
            } catch (e) {
                console.log(e.response.data)
            }
        }

        fetchKontakt()

    }, [])


    //Handlers
    const handleChange =(e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setKontakt(prev => {
            return {...prev, [name]:value}
        })
    }

    const handleSubmit = (e) => {
        axios.post('http://localhost:5000/api/kontakte', kontakt)
          .then(() => {
            history.push("/");
          })
          .catch((error) => {
            seterror(error.response.data)
          });
        e.preventDefault();
    }


    //Conditional rendering
    if(!mitarbeiter)
        return( <div>Loading...</div> )

    return (
        <form className="fluid-container m-4 border" onSubmit={handleSubmit}>
            <div className="col">

                <div className="row mt-2 mb-4 d-flex justify-content-center">
                    Legen Sie einen neuen Kontakt an
                </div>

                <div className="row m-2">
                    <div className="col">
                        <label>Vorname:</label>
                    </div>
                    <div className="col">
                        <input className="w-100" type="text" name="vorname" value={kontakt.vorname} onChange={handleChange}/>
                    </div>
                </div>

                <div className="row m-2">
                    <div className="col">
                        <label>Nachname:</label>
                    </div>
                    <div className="col">
                        <input className="w-100" type="text" name="nachname" value={kontakt.nachname} onChange={handleChange}/>
                    </div>
                </div>

                <div className="row m-2">
                    <div className="col">
                        <label>Mailadresse:</label>
                    </div>
                    <div className="col">
                        <input className="w-100" type="email" name="mailadresse" value={kontakt.mailadresse} onChange={handleChange}/>
                    </div>
                </div>

                <div className="row m-2">
                    <div className="col">
                        <label>Telefonnummer:</label>
                    </div>
                    <div className="col">
                        <input className="w-100" type="text" name="telefonnummer" value={kontakt.telefonnummer} onChange={handleChange}/>
                    </div>
                </div>

                <div className="row m-2">

                    <div className="col">
                        <label >Ansprechpartner:</label>
                    </div>

                    <div className="col">
                        <select className="w-100" onChange={handleChange} name="mitarbeiterid" value={kontakt.mitarbeiterid}>
                            <option value="default" disabled>Wähle...</option>
                            {mitarbeiter && mitarbeiter.map(
                                element => {
                                    return(
                                        <option key={element.mitarbeiterid} value={element.mitarbeiterid}>{element.mitarbeiter_name}</option>
                                    )
                                }
                            )}
                        </select>
                    </div>

                </div>

                <div className="row m-2">
                    <div className="col">
                        <input type="submit" value="Kontakt anlegen" className="btn btn-secondary ml-n1"/>
                    </div>
                    <div className="col small">
                        {error}
                    </div>
                </div>

            </div>
        </form>
    )
}
