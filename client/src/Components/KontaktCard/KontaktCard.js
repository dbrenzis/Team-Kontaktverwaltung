import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const axios = require('axios');

export default function KontaktCard() {


    //States
    const [locked, setlocked] = useState(true)
    const [kontakt, setKontakt] = useState(null)
    const fetchedKontakt = useRef(null)
    const [mitarbeiter, setmitarbeiter] = useState(null)
    const [errorKontakt, seterrorKontakt] = useState(null)
    const [errorUpdate, seterrorUpdate] = useState(null)


    //Hooks
    const id  = parseInt(useParams().id)
    const history = useHistory()

    useEffect(() => {
        Promise.all([
            axios.get(`http://localhost:5000/api/mitarbeiter`),
            axios.get(`http://localhost:5000/api/kontakte/${id}`)
        ]).then((responces) => {
            fetchedKontakt.current = responces[1].data
            setmitarbeiter(responces[0].data)
            setKontakt(responces[1].data)
        }).catch((err) => {
            console.log(err)
            seterrorKontakt(err.response.data)
        });
    }, [id])


    //Handlers
    const handleChange =(e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setKontakt(prev => {
            return {...prev, [name]:value}
        })
    }

    const toggleLocked = () => {
        setlocked(prev => {
            if(!prev)
                setKontakt(fetchedKontakt.current)
            return !prev
        })
    }
 
    const handleUpdate = (e) => {
        axios.put(`http://localhost:5000/api/kontakte/${id}`, kontakt)
          .then(() => {
            history.push("/");
          })
          .catch((error) => {
            seterrorUpdate(error.response.data)
          });
    }

    const handleDelete = (e) => {
        axios.delete(`http://localhost:5000/api/kontakte/${id}`, kontakt)
          .then(() => {
            history.push("/");
          })
          .catch((error) => {
            seterrorUpdate(error.response.data)
          });

    }

    
    //Conditional rendering
    if(errorKontakt)
        return( <div>{errorKontakt}</div> )

    if(!mitarbeiter || !kontakt)
        return( <div>Loading...</div> )


    //Conditional button structure
    const JSXUnlockButtons = (
                        <div className="row m-2">
                            <div className="col">
                                <input type="button" value="Löschen" className="btn btn-danger ml-n1 mr-2" onClick={handleDelete}/>
                                <input type="button" value="Bearbeiten" className="btn btn-secondary ml-n1" onClick={toggleLocked}/>
                            </div>
                            <div className="col small">
                                {errorUpdate}
                            </div>
                        </div>
    )

    const JSXUpdateButtons = (
                        <div className="row m-2">
                            <div className="col">
                                <input type="button" value="Abbrechen" className="btn btn-danger ml-n1 mr-2" onClick={toggleLocked}/>
                                <input type="button" value="Speichern" className="btn btn-secondary ml-n1" onClick={handleUpdate}/>
                            </div>
                            <div className="col small">
                                {errorUpdate}
                            </div>
                        </div>
    )


    return (
        <div className="fluid-container m-4 border">
            <div className="col">

                <div className="row mt-2 mb-4 d-flex justify-content-center">
                    Löschen oder Bearbeiten Sie einen bestehenden Kontakt
                </div>

                <div className="row m-2">
                    <div className="col">
                        <label>Vorname:</label>
                    </div>
                    <div className="col">
                        <input disabled={locked} className="w-100" type="text" name="vorname" value={kontakt.vorname} onChange={handleChange}/>
                    </div>
                </div>

                <div className="row m-2">
                    <div className="col">
                        <label>Nachname:</label>
                    </div>
                    <div className="col">
                        <input disabled={locked} className="w-100" type="text" name="nachname" value={kontakt.nachname} onChange={handleChange}/>
                    </div>
                </div>

                <div className="row m-2">
                    <div className="col">
                        <label>Mailadresse:</label>
                    </div>
                    <div className="col">
                        <input disabled={locked} className="w-100" type="email" name="mailadresse" value={kontakt.mailadresse} onChange={handleChange}/>
                    </div>
                </div>

                <div className="row m-2">
                    <div className="col">
                        <label>Telefonnummer:</label>
                    </div>
                    <div className="col">
                        <input disabled={locked} className="w-100" type="text" name="telefonnummer" value={kontakt.telefonnummer} onChange={handleChange}/>
                    </div>
                </div>

                <div className="row m-2">

                    <div className="col">
                        <label >Ansprechpartner:</label>
                    </div>

                    <div className="col">
                        <select disabled={locked} className="w-100" onChange={handleChange} name="mitarbeiterid" value={kontakt.mitarbeiterid}>
                            <option value="default" disabled>Wähle...</option>
                            {mitarbeiter && mitarbeiter.map( element => {
                                return <option key={element.mitarbeiterid} value={element.mitarbeiterid}>{element.mitarbeiter_name}</option>
                                }
                            )}
                        </select>
                    </div>

                </div>

                {
                    locked ?
                        JSXUnlockButtons
                    :
                        JSXUpdateButtons
                }

            </div>
        </div>
    )
}
