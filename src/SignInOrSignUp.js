import React, { Component } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default class SignInOrSignUp extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: 'signUp'
        }
    }
    switch(e){
        this.setState({
            selected: e.target.value
        })
    }

    render(){
        return(
            <div className="signInOrSignUp">
                <nav className="radio-btn">
                    <div>       
                        <input type="radio" value="signUp"
                        id="radio01" 
                        checked={this.state.selected === 'signUp'} 
                        onChange={this.switch.bind(this)}/>
                        <label htmlFor="radio01"><span></span> 注册</label>
                    </div>
                    <div>
                        <input type="radio" value="signIn"
                        id="radio02" 
                        checked={this.state.selected === 'signIn'} 
                        onChange={this.switch.bind(this)}/>
                        <label htmlFor="radio02"><span></span> 登录</label>
                    </div>
                </nav>
                <div className="panes">

                    {this.state.selected === 'signUp' ? 
                    <SignUpForm formData={this.props.formData}
                    onSubmit={this.props.onSignUp}
                    onChange={this.props.onChange}/>
                     : null}

                    {this.state.selected === 'signIn' ? 
                    <SignInForm formData={this.props.formData}
                    onSubmit={this.props.onSignIn}
                    onChange={this.props.onChange}
                    onForgotPassword={this.props.onForgotPassword}/>
                     : null}

                </div>                
            </div>            
        )
    }
}