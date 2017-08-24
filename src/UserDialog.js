import React, { Component } from 'react'
import './UserDialog.css'
import {signUp, signIn,sendPasswordResetEmail} from './leanCloud'
import SignInOrSignUp from './SignInOrSignUp'
import ForgotPasswordForm from './ForgotPasswordForm'

export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTeb: 'signInOrSignUp', //forgotPassword
            formData: {
                email: '',
                username: '',
                password: '',
            }
        }
    }
    signUp(e){
        e.preventDefault()
        let {email,username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignUp.call(null,user)
            console.log(user)
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
                alert('用户名已被占用')
                break
            default:
                alert(error)
                break
            }
        }    
        signUp(email,username,password,success,error)
    }
    signIn(e){
        e.preventDefault()
        let {username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignIn.call(null,user)
            console.log(user)
        }
        let error = (error)=>{
            switch(error.code){               
                case 210:
                alert('用户名与密码不匹配')
                break
                case 211:
                alert('找不到用户')
                break 
                case 217:
                alert('无效的用户名，不允许空白用户名')
                break
                case 218:
                alert('无效的密码，不允许空白密码')
                break 
                case 219:
                alert('用户登录失败的次数大于 6 次，请15分钟后再试')
                break              
            default:
                alert(error)
                break                
            }
        }
        signIn(username,password,success,error)
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render(){
        return(
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">

                    {this.state.selectedTeb === 'signInOrSignUp' ? 
                    
                    <SignInOrSignUp
                    formData={this.state.formData}
                    onSignIn={this.signIn.bind(this)}
                    onSignUp={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onForgotPassword={this.showForgotPassword.bind(this)}
                    />
                    
                     : 
                    
                    <ForgotPasswordForm 
                    formData={this.state.formData}
                    onSubmit={this.resetPassword.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onSignIn={this.returnToSignIn.bind(this)}
                    />

                    }

                </div>
            </div>
        )
    }
    showForgotPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTeb = 'forgotPassword'
        this.setState(stateCopy)
    }
    returnToSignIn(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTeb = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
}