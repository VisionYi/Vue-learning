import { DATE_FORMAT } from '@/shared/config';
import { getRandomId, isEmpty } from '@/shared/util';
import service from '@/service/users';
import moment from 'moment';

// 這裡是模擬後端 server 使用 Token 認證方式
// 若是使用 JWT Token 會內建一些 user 基本資料
// 詳見 : https://www.jianshu.com/p/23dccad98a6b?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation
export default {

  // 認證成功將回傳 token 與 user 基本資料給前端，失敗則回傳登入的失敗訊息
  async login(userId, password) {
    try {
      const user = await service.queryUser(userId);

      if (!isEmpty(user) && user.password === password) {
        const tokenId = getRandomId(8);
        const lastLoginDate = moment().format(DATE_FORMAT);
        await service.updateUser(userId, { tokenId, lastLoginDate });
        return {
          isSuccess: true,
          result: { tokenId, lastLoginDate, userId },
        };
      }

      return {
        isSuccess: false,
        failureMsg: '帳號或密碼有錯誤！',
      };
    } catch (error) {
      // 捕獲 server onError 產生的錯誤訊息，throw new Error() 可以觸發 Promise error
      throw new Error(error.message);
    }
  },

  // 模擬後端處理 註冊新的會員資料
  async signUp(userId, password) {
    try {
      const user = await service.queryUser(userId);

      if (isEmpty(user)) {
        await service.addUser({
          id: userId,
          password,
          lastLoginDate: null,
          tokenId: null,
        });
        return {
          isSuccess: true,
          result: { userId },
        };
      }

      return {
        isSuccess: false,
        failureMsg: '帳號已重複，請更換。',
      };
    } catch (error) {
      // 捕獲 server onError 產生的錯誤訊息，throw new Error() 可以觸發 Promise error
      throw new Error(error.message);
    }
  },

  // 可以加上 password 做雙重驗證，password 為可選的
  async checkToken(tokenId, password = '') {
    try {
      const user = await service.queryToken(tokenId);

      if (!isEmpty(user) && (password === '' || password === user.password)) {
        const lastLoginDate = moment().format(DATE_FORMAT);
        await service.updateUser(user.id, { lastLoginDate });

        return {
          isSuccess: true,
          result: { lastLoginDate, userId: user.id },
        };
      }

      if (!isEmpty(user) && password !== user.password) {
        return {
          isSuccess: false,
          failureMsg: '密碼錯誤！',
        };
      }

      return {
        isSuccess: false,
        failureMsg: '此 Token 不存在或已經過期了。',
      };
    } catch (error) {
      // 捕獲 server onError 產生的錯誤訊息，throw new Error() 可以觸發 Promise error
      throw new Error(error.message);
    }
  },
};
