import httpService from "./httpServices";

export async function updateAdmin(admin: any) {
  return httpService.put(`/admins/${admin.id}`, admin);
}
export async function getAdmin(id: any) {
  const res = await httpService.get(`/admins?id=${id}`);
  return res.data[0];
}

const adminService = {
  updateAdmin,
  getAdmin,
};
export default adminService;
