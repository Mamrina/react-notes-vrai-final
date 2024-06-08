// import { Category } from "../models/category";

// const BASE_API_URL = import.meta.env.VITE_BACKEND_URL + "/categories/";

// export class CategoryManager {

// //   static get token() {
// //     return localStorage.getItem('jwtToken');
// //   }

// //   static set token(value) {
// //     localStorage.setItem('jwtToken', value);
// //   }

// //   static removeToken() {
// //     localStorage.removeItem('jwtToken');
// //   }
    
//   static async list() {
//     return (
//       fetch(BASE_API_URL, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": CategoryManager.token,
//         },
//       })
//       .then((response) => response.json())
//       .then((categoriesData) =>
//         categoriesData.map((category) => new Category(category.id, category.text))
//       )
//       .catch((error) => window.alert(error))
//     );
//   }

//   static async create(text) {
//     const response = await fetch(BASE_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": CategoryManager.token,
//       },
//       body: JSON.stringify(text),
//     });
//     const data = await response.json();
//     return data;
//   }

//   static async update(id, category) {
//     const response = await fetch(BASE_API_URL + id, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": CategoryManager.token,
//       },
//       body: JSON.stringify(category),
//     });
//     const data = await response.json();
//     return data;
//   }

//   static async delete(id) {
//     const response = await fetch(BASE_API_URL + id, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": CategoryManager.token,
//       },
//     });
//     const data = await response.json();
//     return data;
//   }
// }