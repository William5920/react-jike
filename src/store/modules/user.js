import {createSlice} from '@reduxjs/toolkit'
import {request, getToken, setToken} from '@/utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || ''
  },
  // 同步修改方法(同步actionCreater)
  reducers: {
    setUserInfo(state, action) {
      state.token = action.payload
      setToken(action.payload)
    }
  }
})

// 解构出actionCreater
const {setUserInfo} = userStore.actions

// 异步方法封装(异步actionCreater)
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm)
    dispatch(setUserInfo(res.data.token))
  }
}

// 导出异步方法供业务模块使用
export { fetchLogin }

// 获取并导出reducer函数用于模块整合
const userReducer = userStore.reducer
export default userReducer