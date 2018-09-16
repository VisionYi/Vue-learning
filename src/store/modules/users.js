import auth from '@/service/auth';
import { getLocalData, setLocalData, removeLocalData, isEmpty } from '@/shared/util';
import { TOKEN_KEY, USER_INFO_KEY } from '@/shared/config';

export default {
  namespaced: true,

  state: {
    userLoginInfo: null,
  },

  getters: {
    userLoginInfo: state => state.userLoginInfo,
    userId: state => (!isEmpty(state.userLoginInfo) ? state.userLoginInfo.userId : null),
  },

  mutations: {
    setUserLoginInfo(state, loginInfo) {
      state.userLoginInfo = loginInfo;
    },
    updateUserLoginInfo(state, data) {
      state.userLoginInfo = { ...state.userLoginInfo, ...data };
    },
  },

  actions: {
    initialLocalUser({ commit }) {
      const token = getLocalData(TOKEN_KEY);
      const userInfo = getLocalData(USER_INFO_KEY, {});

      if (token && userInfo) {
        commit('setUserLoginInfo', userInfo);
      }
    },
    // 這裡只處理組件之間會共用到的資料，其他附屬狀態 loading、畫面顯示 message 之類的就到組件中處理
    // 另外這裡不處理 http error 或 server error 產生的訊息，統一交由 shared/request.js 處理
    async loginUser({ commit }, { userId, password }) {
      const { isSuccess, result, failureMsg } = await auth.login(userId, password);
      const { tokenId, ...userInfo } = result;

      if (isSuccess) {
        setLocalData(TOKEN_KEY, tokenId);
        setLocalData(USER_INFO_KEY, userInfo);
        commit('setUserLoginInfo', userInfo);
      }

      return {
        isSuccess,
        msg: isSuccess ? `${userInfo.userId} 登入` : failureMsg,
      };
    },

    logoutUser({ commit }) {
      commit('setUserLoginInfo', null);
      removeLocalData(TOKEN_KEY);
      removeLocalData(USER_INFO_KEY);
    },

    async signUpUser(context, { userId, password }) {
      const { isSuccess, failureMsg } = await auth.signUp(userId, password);
      return {
        isSuccess,
        msg: isSuccess ? `${userId} 已建立` : failureMsg,
      };
    },

    async checkUserToken({ commit }) {
      const localToken = getLocalData(TOKEN_KEY);

      if (localToken) {
        const { isSuccess, result: userInfo, failureMsg } = await auth.checkToken(localToken);

        if (isSuccess) {
          setLocalData(USER_INFO_KEY, userInfo);
          commit('setUserLoginInfo', userInfo);
        } else {
          // 失敗代表 token 不存在造假或已經過期
          // Todo: 跳出訊息框，再轉跳到登入頁面
          console.log('checkUserToken: ', failureMsg);
          removeLocalData(TOKEN_KEY);
          removeLocalData(USER_INFO_KEY);
        }
      }
    },
  },
};
