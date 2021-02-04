import { Auth } from 'aws-amplify';
import { notify } from '../notification';

const auth = {};
window.auth = auth;
const signUpSuccTitle = 'Signup success!';
const signUpSuccMsg = 'Your user account has been created. Please check your email inbox for confirmation code.';
const signUpFailTitle = 'Signup failed';
const confirmSuccTitle = 'email address confirmed!';
const confirmFailTitle = 'signup failed';
const signInSuccTitle = 'Sign in success';
const signInFailTitle = 'Sign in failed';


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
    notify('success', signUpSuccTitle, signUpSuccMsg);
    console.log(result);
    window.auth.unConfirmedUser = result.user;
    history.push('/confirm');
  }, 
  (result) => {
    notify('error', signUpFailTitle, result.message);
    console.log(result);
  }).catch((error) => {
    notify('error', signUpFailTitle, error);
    console.error(error);
  });
}

function confirm(values, history) {
  const p = Auth.confirmSignUp(values.email, values.code);
  p.then((result) => {
    notify('success', confirmSuccTitle, '');
    console.log(result);
    window.auth.user = window.auth.unConfirmedUser;
    delete window.auth.unConfirmedUser;
    history.push('/signin');
  }, 
  (result) => {
    notify('error', confirmFailTitle, result.message);
    console.log(result);
  }).catch((error) => {
    notify('error', confirmFailTitle, error);
    console.error(error);
  });
}

function signIn(values, history, fetchMenuFromRear) {
  const p = Auth.signIn(values.email, values.password);
  p.then((cognitoUser) => {
    notify('success', signInSuccTitle, '');
    console.log({ cognitoUser });
    const str = JSON.stringify(cognitoUser);
    window.localStorage.setItem('user', str);
    fetchMenuFromRear(cognitoUser.username);
    history.push('/welcome');
  },
  (result) => {
    notify('error', signInFailTitle, result.message);
    console.log(result);
  }).catch((error) => {
    notify('error', signInFailTitle, error);
    console.error(error);
  });
}

function logout() {
  window.localStorage.clear();
  window.location.reload();
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