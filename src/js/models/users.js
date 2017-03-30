import {login,query,remove} from '../service/user';
export default {
    namespace: 'users',
    state: {
        list: [],
        login: true,
        loading: false,
        user: {
            name:"aaaa"
        },
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
            current: 1,
            total: null
        },
        loginMessage:"" // 登录提示信息
    },
    reducers: {
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
        },
        querySuccess (state, action) {
            const {list, pagination} = action.payload
            return { ...state,
                list,
                loading: false,
                pagination: {
                    ...state.pagination,
                    ...pagination
                }}
        },
        removeSuccess(state, action){
            const {list, pagination} = action.payload
            return { ...state,
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
                        pagination: data.page
                    }
                })
            }
        },
        *remove({payload},{call, put}){
            console.log("dispatch分发过来的");
            console.log(payload);
            const data = yield remove(payload.id)
            if(data.success){
                yield put({
                    type:"removeSuccess",
                    payload:{
                        // list: data.obj,
                        // pagination: data.page
                    }
                })
            }
        }
    },
    subscriptions: {

    },
};
