import {createSlice} from '@reduxjs/toolkit'
import {http} from '@/utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: '',
    userInfo: {}
  },
  // 同步修改方法(同步actionCreater)
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    }
  }
})

// 解构出actionCreater
const {setUserInfo} = userStore.actions

// 异步方法封装(异步actionCreater)
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', loginForm)
    console.log('token接口响应', res)
    dispatch(setUserInfo(res.data.token))
  }
}

// 导出异步方法供业务模块使用
export { fetchLogin }

// 获取并导出reducer函数用于模块整合
const userReducer = userStore.reducer
export default userReducer