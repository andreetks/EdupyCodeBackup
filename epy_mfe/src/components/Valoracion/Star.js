import React, { Component } from 'react'

export class Star extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }

    valorar = (event) => {
        console.log(`El valor es ahora de ${this.props.amount}`);
    }

    render() {
        return (
            <button
                className="btn star-button"
                onClick={this.valorar}
            >
                <i className={`fas fa-star ${this.props.on ? "text-warning" : "text-secondary"}`}></i>
            </button>
        )
    }
}

export default Star
