import {createSlice} from '@reduxjs/toolkit'
import {getToken, setToken, clearToken} from '@/utils'
import {loginAPI, userProfileAPI} from "@/apis/user"

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  // 同步修改方法(同步actionCreater)
  reducers: {
    setUserToken(state, action) {
      state.token = action.payload
      setToken(action.payload)
    },
    setUserInfo(state, action) {
      console.log('用户信息', action.payload)
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      clearToken()
    }
  }
})

// 解构出actionCreater
const {setUserToken, setUserInfo, clearUserInfo} = userStore.actions

// 异步方法封装(异步actionCreater)
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm)
    dispatch(setUserToken(res.data.token))
  }
}
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res =await userProfileAPI()
    dispatch(setUserInfo(res.data))
  }
}

// 导出异步方法供业务模块使用
export { fetchLogin, fetchUserInfo, clearUserInfo }

// 获取并导出reducer函数用于模块整合
const userReducer = userStore.reducer
export default userReducer