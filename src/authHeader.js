export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("authHeader -> user : ");
  console.log(user);
  if (user && user.accessToken) {
    console.log( "Authorization: bearer  "+ user.accessToken);
    return {Authorization: 'Bearer ' + user.accessToken};
  } else {
    return {};
  }
}