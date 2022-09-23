import React from 'react';
import './Footer.css';
import { BsChevronCompactDown } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { BsInfoCircleFill } from "react-icons/bs";




const Footer = () => {
    return (
        <div className='generalCont'>
            <div className='titleLink'>
                <h4>LINKEDIN</h4>
            </div>
            <div className='body'>
                <div className="grid-container1">
                    <div>Informazioni</div>
                    <div>Accessbilità</div>
                    <div>Talent solution</div>
                    <div>Linee guida della community</div>
                    <div>Carriera</div>
                    <div>Soluzioni d marketing</div>
                    <span className="dropdown">
                        <div className='pnc'>Privacy e condizioni<BsChevronCompactDown /></div>
                        <span className="dropdown-content">
                            <p>Informativa sulla privacy</p>
                            <p>Contatto di licenza</p>
                            <p>Informativa sui cookie</p>
                            <p>Informativa sul copyright</p>
                        </span>
                    </span>
                    <div>Opzioni di annuncio</div>
                    <div>Pubblicità</div>
                    <div>Sales solutions</div>
                    <div>Mobile</div>
                    <div>Piccole imprese</div>
                    <div>Centro sicurezza</div>
                </div>

                <div className="grid-container2">
                    <div className="iconSec">
                        <ul><BsInfoCircleFill />
                            <li className='violet'>Domande?</li>
                            <li className='clear'>Visita il nostro Centro assistenza</li>
                        </ul>
                        <ul><BsFillGearFill />
                            <li>Gestisci il tup account e la tua privacy</li>
                            <li className='clear'>Vai alle impostazioni</li>
                        </ul>
                    </div>



                    <div className='lingua'>
                        <span>Seleziona lingua</span>
                        <div>
                            <select name="lingua" id="lingua">
                                <option value="italiano">italiano</option>
                                <option value="italiano">inglese</option>
                                <option value="italiano">francese</option>
                            </select>
                        </div>




                    </div>
                </div>

            </div>
            <p className='clear'>LinkedIn Corporation &copy;2022</p>
        </div>
    );
}

export default Footer;