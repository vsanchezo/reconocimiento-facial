import React from 'react';


class Registro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            emailAcceso: '',
            passAcceso: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({emailAcceso: event.target.value});
    }

    onPassChange = (event) => {
        this.setState({passAcceso: event.target.value});
    }

    alPushar = () => {
        console.log('funciona hasta qui', this.state.emailAcceso, this.state.passAcceso);
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.emailAcceso,
                pass: this.state.passAcceso
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data === 'exito'){
                this.props.onRouteChange('home');
            }
        })
        
    }

    render() {
        const { onRouteChange } = this.props;
        return(
            <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={this.onEmailChange}
                                 />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPassChange}
                                 />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                            onClick={this.alPushar} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Ingresar" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('nuevo')} className="f6 link dim black db pointer">Registrarse</p>
                        </div>
                    </form>
                </main>
            </article>
        )
    }
}

export default Registro;