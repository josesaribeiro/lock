import Mode from '../lock/mode';
import Login from './login';
import ResetPassword from './reset_password';
import SignUp from './sign_up';
import { getActivity, initDatabase } from './index';
import dict from './dict';
import LoadingScreen from '../lock/loading_screen';

export default class DatabaseMode extends Mode {

  constructor() {
    super("database", dict);
  }

  willOpen(model, options) {
    this.setModel(initDatabase(model, options));
  }

  render(lock) {
    if (!lock.has("sso")) {
      return new LoadingScreen();
    }

    const activity = getActivity(lock);
    switch(activity) {
      case "login":
      return new Login();

      case "signUp":
      return new SignUp();

      case "resetPassword":
      return new ResetPassword();

      default: // TODO: show a crashed screen.
      throw new Error("unknown activity");
    }
  }

}