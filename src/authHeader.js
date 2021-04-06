export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  if (user && user.accessToken) {
    return { Authorization: 'bearer ' + user.accessToken };//'bearer ' obligatoire dans les standards
  } else {
    return {};
  }
}