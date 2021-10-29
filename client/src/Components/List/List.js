import React, {useState, useEffect} from 'react';
import ListElement from './ListElement';

const axios = require('axios');

export default function List() {


    //States
    const [kontaktList, setkontaktList] = useState(null)


    //Hooks
    useEffect(() => {

        const fetchKontakte = async () => {
            try {
                const kontakteArray = await axios.get("/api/kontakte")
                setkontaktList(kontakteArray.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchKontakte()

    }, [])


    return (
        <ul className="container-fluid" style={{listStyleType:"none"}}>

                <h2 className="mt-3 mb-2" style={{fontSize: "17px"}}>
                    {
                        !kontaktList ?
                            <span>Loading...</span>
                        :
                            <span>{`Anzahl an Kontakten: ${kontaktList.length}`}</span>     
                    }
                </h2>

                {kontaktList && kontaktList.map( kontakt => <ListElement key={kontakt.kontaktid} kontakt={kontakt}/> ) }

        </ul>
    )
}
