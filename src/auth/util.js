import { Auth } from 'aws-amplify';
import { notify } from '../notification';
import fetch from 'unfetch';
import { baseUrl } from '../config';


const auth = {};
window.auth = auth;
const SIGNUP_SUCC_TITLE = 'Signup success!';
const SIGNUP_SUCC_MSG = 'Your user account has been created. Please check your email inbox for confirmation code.';
const SIGNUP_FAIL_TITLE = 'Signup failed';
const CONFIRM_SUCC_TITLE = 'email address confirmed!';
const CONFIRM_FAIL_TITLE = 'signup failed';
const SIGNIN_SUCC_TITLE = 'Sign in success';
const SIGNIN_FAIL_TITLE = 'Sign in failed';


function isSignedIn() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  return !!user;
}

function getNickName() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (!user) return null;
  return user.attributes.nickname;
}

function getUserId() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (!user) return null;
  return user.username;
}

function signUp(values, history) {
  const p = Auth.signUp({
    username: values.email,
    password: values.password,
    attributes: {
      email: values.email,
      nickname: values.nickname,
    }
  });

  p.then((result) => {
    notify('success', SIGNUP_SUCC_TITLE, SIGNUP_SUCC_MSG);
    console.log(result);
    window.auth.unConfirmedUser = result.user;
    window.auth.unConfirmedUser.userId = result.userSub;
    history.push('/confirm');
  }, 
  (result) => {
    notify('error', SIGNUP_FAIL_TITLE, result.message);
    console.log(result);
  }).catch((error) => {
    notify('error', SIGNUP_FAIL_TITLE, error);
    console.error(error);
  });
}

function confirm(values, history) {
  const p = Auth.confirmSignUp(values.email, values.code);
  p.then(async (result) => {
    notify('success', CONFIRM_SUCC_TITLE, '');
    console.log(result);
    window.auth.user = window.auth.unConfirmedUser;
    delete window.auth.unConfirmedUser;
    await initialize(window.auth.user);
    console.log("initialize completed!");
    history.push('/signin');
  }, 
  (result) => {
    notify('error', CONFIRM_FAIL_TITLE, result.message);
    console.log(result);
  }).catch((error) => {
    notify('error', CONFIRM_FAIL_TITLE, error);
    console.error(error);
  });
}

function signIn(values, history, fetchMenuFromRear) {
  const p = Auth.signIn(values.email, values.password);
  p.then((cognitoUser) => {
    notify('success', SIGNIN_SUCC_TITLE, '');
    console.log({ cognitoUser });
    const str = JSON.stringify(cognitoUser);
    window.localStorage.setItem('user', str);
    fetchMenuFromRear(cognitoUser.username);
    history.push('/welcome');
  },
  (result) => {
    notify('error', SIGNIN_FAIL_TITLE, result.message);
    console.log(result);
  }).catch((error) => {
    notify('error', SIGNIN_FAIL_TITLE, error);
    console.error(error);
  });
}

function logout() {
  window.localStorage.clear();
  window.location.reload();
}

async function initialize(user) {
  await fetch(`${baseUrl}/api/initialize/${user.userId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    method: 'GET',
  })
  .then(() => {}, e => Promise.reject(e));
}

export {
  isSignedIn,
  getNickName,
  signUp,
  confirm,
  signIn,
  getUserId,
  logout,
};