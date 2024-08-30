export const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$',
);
export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
// export const validVehicleNumber = new RegExp(
//   '^[A-Z]{2}[\\ -]{0, 1}[0-9]{2}[\\ -]{0, 1}[A-Z]{1, 2}[\\ -]{0, 1}[0-9]{4}$',
// );
export const urlRegExp = new RegExp(/([^\/]+)(?:\?.*)?$/);
export const validCardExpiry = new RegExp(
  /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/,
);
