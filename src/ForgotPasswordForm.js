import React, {Component} from 'react'

export default class ForgotPasswordFrom extends Component {
    render(){
        return(
            <div className="forgotPassword">
                <h3>
                    重置密码
                </h3>
                <form className="forgotPasswordFrom" 
                onSubmit={this.props.onSubmit}>
                    <div className="row">
                        <input type="text" 
                        placeholder="邮箱"
                        value={this.props.formData.email}
                        onChange={this.props.onChange.bind(this,'email')}/>
                    </div>
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.props.onSignIn.bind(this)}>返回登录</a>
                    </div>
                </form>
            </div>            
        )
    }
}