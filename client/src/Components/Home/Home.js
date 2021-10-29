import './Home.css';
import React from 'react';
import { Link } from 'react-router-dom';


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
            <div className = 'Home'>
                <div className = 'Container'>
                    <Link className='Entry' to = '/home'>
                        HOME
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home;