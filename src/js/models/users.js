import {login,query,remove,create} from '../service/user';
export default {
    namespace: 'users',
    state: {
        list: [],
        login: true,
        loading: false,
        queryMessage:"",
        user: {
            name:"aaaa"
        },
        loginMessage:"" // 登录提示信息
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
        querySuccess (state, action) {
            const {list, pagination,queryMessage} = action.payload
            return { ...state,
                queryMessage,
                list,
                loading: false,
                pagination: {
                    ...state.pagination,
                    ...pagination
                }}
        }
    }
    ,
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
        },
        *listAll({payload},{call, put}){
            console.log("dispatch分发过来的");
            console.log(JSON.stringify(payload));
            const data = yield query(JSON.stringify(payload))
            if(data.success){
                yield put({
                    type:"querySuccess",
                    payload:{
                        list: data.obj,
                        queryMessage:payload,
                        pagination: data.page
                    }
                })
            }
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
