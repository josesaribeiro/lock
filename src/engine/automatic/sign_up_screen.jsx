import React from 'react';
import Screen from '../../core/screen';
import {
  hasScreen,
  mustAcceptTerms,
  termsAccepted
} from '../../connection/database/index';
import SignUpTerms from '../../connection/database/sign_up_terms';
import {
  signUp,
  toggleTermsAcceptance
} from '../../connection/database/actions';
import LoginSignUpTabs from '../../connection/database/login_sign_up_tabs';
import { renderSignedInConfirmation } from '../../core/signed_in_confirmation';
import { renderSignedUpConfirmation } from '../../connection/database/signed_up_confirmation';
import SignUpPane from './sign_up_pane';
import SocialButtonsPane from '../../field/social/social_buttons_pane';
import * as l from '../../core/index';
import PaneSeparator from '../../core/pane_separator';
import { isSSOEnabled } from '../automatic';
import SingleSignOnNotice from '../../connection/enterprise/single_sign_on_notice';
import { logIn as enterpriseLogIn } from '../../connection/enterprise/actions';

const Component = ({model, t}) => {
  const headerText = t("headerText") || null;
  const header = headerText && <p>{headerText}</p>;

  const sso = isSSOEnabled(model);
  const ssoNotice = sso
    && <SingleSignOnNotice>
         {t("ssoEnabled", {__textOnly: true})}
       </SingleSignOnNotice>;

  const tabs = !sso
    && <LoginSignUpTabs
         key="loginsignup"
         lock={model}
         loginTabLabel={t("loginTabLabel", {__textOnly: true})}
         signUpTabLabel={t("signUpTabLabel", {__textOnly: true})}
       />;

  const social = l.hasSomeConnections(model, "social")
    && <SocialButtonsPane lock={model} t={t} signUp={true} />;

  const db =
    <SignUpPane
      emailInputPlaceholder={t("emailInputPlaceholder", {__textOnly: true})}
      model={model}
      onlyEmail={sso}
      passwordInputPlaceholder={t("passwordInputPlaceholder", {__textOnly: true})}
      usernameInputPlaceholder={t("usernameInputPlaceholder", {__textOnly: true})}
    />;

  const separator = social
    && <PaneSeparator>{t("separatorText")}</PaneSeparator>;

  return <div>{ssoNotice}{tabs}{header}{social}{separator}{db}</div>;
};

export default class SignUp extends Screen {

  constructor() {
    super("signUp");
  }

  submitHandler(model) {
    return isSSOEnabled(model) ? enterpriseLogIn : signUp;
  }

  renderAuxiliaryPane(lock) {
    return renderSignedInConfirmation(lock) || renderSignedUpConfirmation(lock);
  }

  renderTabs() {
    return true;
  }

  renderTerms(m, t) {
    const terms = t("terms");
    const checkHandler = mustAcceptTerms(m)
      ? () => toggleTermsAcceptance(l.id(m))
      : undefined;
    return terms || mustAcceptTerms(m)
      ? <SignUpTerms
          checkHandler={checkHandler}
          checked={termsAccepted(m)}
        >
          {terms}
        </SignUpTerms>
      : null;
  }

  render() {
    return Component;
  }

}