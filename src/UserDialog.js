import React, { Component } from 'react'

export default class UserDialog extends Component{
    render(){
        return(
            <div className="UserDialog-Wrapper">
                <div>
                    <nav>
                        <input type="radio"/> 注册
                        <input type="radio"/> 登录
                    </nav>
                    <div>
                        <form className="signUp"> {/* 注册*/}
                            <div className="row">
                                <label>用户名</label>
                                <input type="text"/>
                            </div>
                            <div>
                                <label>密码</label>
                                <input type="password"/>
                            </div>
                            <div className="row actions">
                                <button type="submit">注册</button>
                            </div>
                        </form>
                        <form>
                            <form className="signIn"> {/* 登录*/}
                                <div className="row">
                                    <label>用户名</label>
                                    <input type="text"/>     
                                </div>
                                <div className="row">
                                    <label>密码</label>
                                    <input type="password"/>
                                </div>
                                <div className="row actions">
                                    <button type="submit">登录</button>
                                </div>                                
                            </form>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}