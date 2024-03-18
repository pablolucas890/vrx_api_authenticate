export const SERVER_PROTOCOL = 'http';
export const SERVER_PORT = 8080;
export const SERVER_HOST = '0.0.0.0';

export function verifyPassword(password: string) {
  return password.length >= 8;
}
export function verifyPhone(phone: string) {
  return phone.length >= 8;
}
export function verifyName(name: string) {
  return name.length >= 8;
}
export function verifyEmail(email: string) {
  return email.length >= 8 && email.indexOf('@') !== -1 && email.indexOf('.') !== -1;
}
export function verifyConfirmPassword(password: string, confirmPassword: string) {
  return password.length >= 8 && confirmPassword.length >= 8 && password === confirmPassword;
}

export const hoverClassName = 'hover:scale-110 hover:shadow-xl duration-300';
