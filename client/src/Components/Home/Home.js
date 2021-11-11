import styles from './Home.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Images/Logo.png'

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    Go_Home = ()=>{
        // this.context.router.push("/home")
    }

    render(){
        return(
            <div className = {styles.Home}>
                <div className = {styles.HomeContainer}>
                    <p className = {styles.Titulo}>
                        <p className= {styles.Saludo}>
                            Hello!
                        </p>
                        <p className = {styles.Texto}>
                            Welcome to the Best Video Games Search Web Site
                        </p>
                    </p>
                    <Link className={styles.Entry} to = 'home/GamesList'>
                        Home
                    </Link>
                        <img className={styles.Logo} src={Logo}/>
                </div>
            </div>
        )
    }
}

export default Home;