import { StorageKeys } from '../constants';

export class AuthService {
  isLoggedIn;
  currentUser;
  token;

  get activeUser() {
    const savedSession = sessionStorage.getItem(StorageKeys.USER);
    const savedToken = sessionStorage.getItem(StorageKeys.TOKEN);

    if (!savedSession) return null;

    if (!this.currentUser) {
      const userInfo = JSON.parse(savedSession);
      this.loginUser(userInfo, savedToken);
    }

    return { ...this.currentUser };
  }

  loginUser(userInfo, token = '') {
    if (!userInfo) return;

    this.isLoggedIn = true;
    this.currentUser = userInfo;
    sessionStorage.setItem(StorageKeys.USER, JSON.stringify(userInfo));
    sessionStorage.setItem(StorageKeys.TOKEN, token || userInfo.token);
    delete this.currentUser.token;
  }

  logoutUser() {
    this.isLoggedIn = false;
    this.currentUser = null;
    sessionStorage.removeItem(StorageKeys.USER); // Remove stored data on logout
    sessionStorage.removeItem(StorageKeys.TOKEN);
  }

}

const authService = new AuthService();

export default authService;