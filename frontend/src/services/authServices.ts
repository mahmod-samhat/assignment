import httpService from "./httpServices";

export async function logIn(credentials: any) {
  const { data } = await httpService.get(
    `/admins?username=${credentials.username}`
  );
  const admin = data[0];
  if (admin) localStorage.setItem("id", admin?.id);
  return admin;
}

export function logout() {
  localStorage.removeItem("id");
}
const authService = {
  logIn,
  logout,
};
export default authService;
