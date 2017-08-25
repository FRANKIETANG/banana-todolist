import AV from 'leancloud-storage'

  var TodoFolder = AV.Object.extend('TodoFolder');
  // 新建对象
  var todoFolder = new TodoFolder();
  // 设置名称
  todoFolder.set('name','工作');
  // 设置优先级
  todoFolder.set('priority',1);
  todoFolder.save().then(function (todo) {
    console.log('objectId is ' + todo.id);
  }, function (error) {
    console.error(error);
  });

var APP_ID = 'i755oGDcOG1gY4p2Vgm1AqXJ-gzGzoHsz'
var APP_KEY = 'GAhJHhVihOm5OSaNRNtc5vhs'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

export function signUp(email,username,password,successFn,errorFn){
  var user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
  return undefined
}

export function signIn(username,password,successFn,errorFn){
  AV.User.logIn(username,password).then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
}

export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

export function signOut(){
  AV.User.logOut()
  return undefined
}

export function sendPasswordResetEmail(email,successFn,errorFn){
  AV.User.requestPasswordReset(email).then(function(success){
    successFn.call()
  },function(error){
    errorFn.call(null,error)
  })
}

function getUserFromAVUser(AVUser){
  return{
    id: AVUser.id,
    ...AVUser.attributes
    // 这里的 ... 把 AVUser.attributes 的属性拷贝到这个对象    
  }
}