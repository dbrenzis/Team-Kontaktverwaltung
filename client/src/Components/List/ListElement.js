import React from 'react'
import { Link } from 'react-router-dom'

export default function ListElement(props) {


    const {kontakt} = props

    //Alternativer Code für viele Attribute
    /*
    let index = 0
    const attributeNames = ["Vorname:", "Nachname:", "Mailadresse:", "Telefonnummer:", "Ansprechpartner:"]
    let JSXattributes = []
    
    for (const key in data) {
            const element = data[key];
            const name = attributeNames[index]
            index++

            const JSXattribute = 
                                    <div className="row">
                                        <div className="col-2">
                                            {name}
                                        </div>
                                        <div className="col">
                                            {element}
                                        </div>
                                    </div>

            JSXattributes.push(JSXattribute)
    }

    */

    return (
        <li className="border rounded mb-4" >
            <div className="col">

                <div className="row border-bottom justify-content-center ">
                    <Link to={`/kontakt/${kontakt.kontaktid}`} className="text-body">{`Kontakt ${kontakt.kontaktid}`}</Link>
                </div>

                <div className="row">
                    <div className="col-2">
                        Vorname:
                    </div>
                    <div className="col">
                        {kontakt.vorname}
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        Nachname:
                    </div>
                    <div className="col">
                        {kontakt.nachname}
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        Mailadresse:
                    </div>
                    <div className="col">
                        {kontakt.mailadresse}
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        Telefonnummer:
                    </div>
                    <div className="col">
                        {kontakt.telefonnummer}
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        Ansprechpartner:
                    </div>
                    <div className="col">
                        {kontakt.mitarbeiter_name}
                    </div>
                </div>

            </div>
        </li>
    )
}
