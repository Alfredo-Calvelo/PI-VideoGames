import React from "react";
import styles from'./NavBar.module.css'
import { Link } from 'react-router-dom';
import Logo from '../../Images/Logo.png'

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
                <div className = {styles.NavBar}>
                    <div></div>
                    <div className = {styles.Botones}>
                            <Link className={styles.Boton} to = ''>
                                Search Game
                            </Link>
                            <Link className={styles.Boton} to = ''>
                                Add Game
                            </Link>
                            <Link className={styles.Boton} to = '/home/GamesList'>
                                Games List
                            </Link>
                            <Link className={styles.Boton} to = ''>
                                About Us
                            </Link>


                    </div>
                    <div className = {styles.Buscador}>
                        <img src={Logo} className={styles.Logo} />
                    </div>

                </div>
        )
    }
}

export default NavBar;