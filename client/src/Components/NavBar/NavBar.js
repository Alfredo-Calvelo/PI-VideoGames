import React from "react";
import './NavBar.css'
import Form from "./Form";

class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div className = 'NavBar'>
                <button>
                    Inicio
                </button>
                <button>
                    About Us
                </button>
                <button>
                    
                </button>
                <button>
                    Inicio
                </button>

                <Form/>
            </div>
        )
    }
}

export default NavBar;