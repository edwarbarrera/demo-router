export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("authHeader -> user : ");
  console.log(user);
  if (user && user.accessToken) {
<<<<<<< HEAD
    console.log( "Authorization: bearer  "+ user.accessToken);
    return {Authorization: 'Bearer ' + user.accessToken};
=======
    return { Authorization: 'bearer ' + user.accessToken };//'bearer ' obligatoire dans les standards
>>>>>>> ed
  } else {
    return {};
  }
}