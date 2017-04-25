import {login,query,remove,create} from '../service/user';
export default {
    namespace: 'users',
    state: {
        login: false,
        queryMessage:"",
        token:"",
        user: {
            name:"aaaa"
        },
        loginMessage:"" ,// 登录提示,


        list: [],
        total: null,
        loading: false, // 控制加载状态
        current: null, // 当前分页信息
        currentItem: {}, // 当前操作的用户对象
        modalVisible: false, // 弹出窗的显示状态
        modalType: 'create',
    },
    reducers: {
        loginSuccess(state,action){
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
        },
    }
    ,
    effects: {
        *login({payload},{call, put}){
            console.log("dispatch分发过来的");
            console.log(JSON.stringify(payload));
            const data = yield login(JSON.stringify(payload))
            console.log(data);
            if(data.code == 200){
                if (data.obj.token) {
                    sessionStorage.setItem('token', data.obj.token);
                }
                yield put({
                    type:"loginSuccess",
                    payload:{
                        user:data.obj.userId,
                        token:data.obj.token
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
        },
        *query({payload},{call, put}){
            console.log("dispatch分发过来的");
            console.log(JSON.stringify(payload));
            const data = yield query(JSON.stringify(payload))
            console.log(data);
                yield put({
                    type:"querySuccess",
                    payload:{
                        list: data,
                        queryMessage:payload,
                        pagination: data.page
                    }
                })
        },
        *remove({payload},{call, put}){
            console.log("dispatch分发过来的");
            console.log(payload);
            const data = yield remove(payload.id)
            yield put({
                    type:"listAll",
                    payload:{
                        deleteMessage:data.message
                    }
                })
        },
        *create({payload},{call, put}){
            console.log("创建用户");
            console.log(payload);
            const data = yield create(JSON.stringify(payload))
            yield put({
                type:"listAll",
                payload:{
                    deleteMessage:data.message
                }
            })
        }
    },
    subscriptions: {

    },
};
