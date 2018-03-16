import {TOKEN_CACHE_NAME,TOKEN_EXPIRE_NAME} from '../constant';
import {Storage} from '../app/utils';
function Token() {

}
Token.prototype.access_token = null;
Token.prototype.expires_in = 0;
Token.prototype.type = null;
let store = new Storage();

const UserApi = {
    getUser() {
        return axios.get('/user').then(response => response.data)
    },
    login(credentials){
        return axios.post('/login', credentials, {
            guest : true
        }).then(response =>{
            return this.afterLogin(response.data)
        })
    },
    logout(){
        return axios.post('/logout').then(response => {
            this.clearToken();
            return response.data;
        })
    },
    clearToken(){
        store.remove(TOKEN_EXPIRE_NAME);
        store.remove(TOKEN_CACHE_NAME);
    },
    afterLogin(token){
        store.put(TOKEN_CACHE_NAME, token.access_token);
        if ( token.expires_in > 0 ) {
            store.put(TOKEN_EXPIRE_NAME, new Date().getTime() + token.expires_in * 1000 - 5000);
        }
        return token;
    },
    refresh(){
        let token = store.get(TOKEN_CACHE_NAME);
        return axios.post('/refresh', {}, {
            guest : true,
            headers : {
                Authorization : 'Bearer ' + token
            },
            toast : false
        }).then(response =>{
            return this.afterLogin(response.data)
        })
    },
    readyToRefresh(ttl, cb){
        setTimeout(() => {
            typeof cb === 'function' || (cb = token => token);
            this.refresh().then(cb);
        }, ttl)
    }
};
const fakeToken = {
  access_token : 'test_token',
  expires_in : 999999999,
  type : 'bearer'
}
const FakeApi = {
  getUser() {
    return Promise.resolve({
      id: 1,
      name : 'Admin demo',
      avatar : 'https://lorempixel.com/480/480/?25456'
    })
  },
  login(){
    return Promise.resolve(UserApi.afterLogin(fakeToken))
  },
  logout(){
    return Promise.resolve(null);
  },
  clearToken(){
    UserApi.clearToken()
  },
  refresh(){
    return this.afterLogin(fakeToken)
  },
}


// export default UserApi; // For production
export default FakeApi; // For test
