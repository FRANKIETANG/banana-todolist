import AV from 'leancloud-storage'

var APP_ID = 'i755oGDcOG1gY4p2Vgm1AqXJ-gzGzoHsz'
var APP_KEY = 'GAhJHhVihOm5OSaNRNtc5vhs'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export default AV

export function signUp(username,password,successFn,errorFn){
  var user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
  return undefined
}

function getUserFromAVUser(AVUser){
  return{
    id: AVUser.id,
    ...AVUser.attributes
    // 这里的 ... 把 AVUser.attributes 的属性拷贝到这个对象    
  }
}