import httpService from "./httpServices";

export async function getAllUsers() {
  return httpService.get("/users");
}

//filter:{
//    items:[
//        0: {id,columnField,operatorValue,value}
//          ]
//       }
export async function getUsers(page: number, limit: number, filters?: any) {
  let filtersParams = "";
  if (filters) {
    //search with operators
    if (filters.items.length && filters.items[0].value) {
      if (filters.items[0].operatorValue == "equals")
        filtersParams = `&${filters.items[0].columnField}=${filters.items[0].value}`;
      else
        filtersParams = `&${filters.items[0].columnField}_like=${filters.items[0].value}`;
    }
    // quick search by first_name
    if (filters.quickFilterValues.length) {
      filtersParams += `&first_name_like=${filters.quickFilterValues[0]}`;
    }
  }
  return httpService.get(
    `/users?_page=${page}&_limit=${limit}${filtersParams}`
  );
}

export async function getUserById(id: any) {
  return httpService.get(`/users/${id}`);
}
export async function updateUser(user: any) {
  return httpService.put(`/users/${user.id}`, user);
}
export async function deleteUser(id: any) {
  return httpService.delete(`/users/${id}`);
}

const userService = {
  deleteUser,
  getAllUsers,
  getUsers,
  getUserById,
  updateUser,
};
export default userService;
