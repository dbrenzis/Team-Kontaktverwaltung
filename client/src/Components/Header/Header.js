import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

    return (
        <div className="container-fluid bg-secondary text-white" >
            <div className="row align-items-center" style={{height:"60px"}}>

                <div className="col">
                    <h2 className="font-weight-bold text-left" style={{height:"20px", fontSize:"16px"}}>
                        <Link to="/" className="text-white">Kontaktverwaltung</Link>
                    </h2>
                </div>
                
                <div className="col text-right">
                    <Link to="/kontakt" className="btn btn-secondary">Neuer Kontakt</Link>
                </div>
                
            </div>
        </div>
    )
}
