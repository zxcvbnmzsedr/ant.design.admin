import {login} from '../service/user';
export default {
    namespace: 'users',
    state: {
        login: true,
        loading: false,
        user: {
            name:"aaaa"
        },
        loginMessage:"" // 登录提示信息
    },    reducers: {
        loginSuccess(state,action){
            console.log(state);
            return{
                ...state,
                ...action.payload,
                login:true
            }
        },
        loginFailure(state,action){
            return{
                ...state,
                ...action.payload,
                login:false
            }
        }
    },
    effects: {
        *login({payload},{call, put}){
            console.log("dispatch分发过来的");
            console.log(JSON.stringify(payload));
            const data = yield login(JSON.stringify(payload))
            if(data.success){
                yield put({
                    type:"loginSuccess",
                    payload:{
                        user:payload.username
                    }
                })
            }else {
                yield put({
                    type:"loginFailure",
                    payload:{
                        loginMessage:data.message
                    }
                })
            }
        }
    },
    subscriptions: {

    },
};
