import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut,TodoModel} from './leanCloud'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }

    this.initTodoGetByUser() 
    //要把代码封装起来，让他登录成功之后引用。为什么刷新一遍会有 todolist 
    //那是因为重新跑了一遍之个构造函数。

  }

  render() {

    let todos = this.state.todoList
      .filter((item)=> !item.deleted)
      .map((item,index)=>{
      return (
        <li key={index}>
          <TodoItem todo={item} 
          onToggle={this.toggle.bind(this)} 
          onDelete={this.delete.bind(this)} />
        </li>
      )
    })
    console.log(todos)

    return (
      <div className="App">
        <h4>
          <span>
            {this.state.user.username||'我'} 的任务
            {this.state.user.id ? 
            <button onClick={this.signOut.bind(this)}>
              登出
            </button> : null}
          </span>  
        </h4>
        <div className='inputWapper'>
          <TodoInput content={this.state.newTodo} 
          onSubmit={this.addTodo.bind(this)} 
          onChange={this.changeTitle.bind(this)}/>
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {
          this.state.user.id ? null :
          <UserDialog 
          onSignUp={this.onSignUpOrSignIn.bind(this)}
          onSignIn={this.onSignUpOrSignIn.bind(this)}
          todoInit={this.initTodoGetByUser.bind(this)}/>
        }
      </div>
    )
  }
  
  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  componentDidUpdate(){
    
  }
  initTodoGetByUser(){
    let user = getCurrentUser()
    if(user){
      TodoModel.getByUser(user,(todos)=>{
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
        console.log('从leancloud获取用户信息',this.state)
      })
    }    
  }
  toggle(e,todo){
    let oldStatus = todo.status
    todo.status = todo.status ==='completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    },(error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }
  changeTitle(e){
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(e){
    let newTodo={
      title: e.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo,(id)=>{
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    },(error) => {
      console.log(error)  
    })
  }
  delete(e,todo){ //不应该直接删除，而是将数据标记为 deleted： true
    TodoModel.destroy(todo.id,()=>{
      todo.deleted = true
      this.setState(this.state)
    })
  }
}

export default App;

