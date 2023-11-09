// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import Table from '../../user/Tables/Table'
// import { TableBody, TableHead } from '@mui/material';
// import { adminInstance } from '../../../utils/Axios';


// function CategoryList() {
//   const [categoryList, setCategoryList] = useState([]);
//   const [category_name, setCategoryName] = useState(''); // Define categoryName
//   const [existingCategoryName, setExistingCategoryName] = useState(''); // Define existingCategoryName
//   const [categoryImage, setCategoryImage] = useState(null); // Define categoryImage
//   const [existingCategoryImage, setExistingCategoryImage] = useState(null); // Define existingCategoryImage

//   useEffect(() => {
//     adminInstance.get('/categorylist')
//       .then((response) => {
//         console.log(response.data);
//         setCategoryList(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching categories:', error);
//       });
//   }, []);

//   const handleEditCategory = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('category_name', existingCategoryName);
//     formData.append('image', existingCategoryImage);

//     if (category_name !== existingCategoryName) {
//       formData.append('new_category_name', category_name);
//     }

//     if (categoryImage !== existingCategoryImage) {
//       formData.append('new_image', categoryImage);
//     }
//   }
//   const handleCategoryDelete = (category_id) => {
//     // Make an API request to delete the category
//     adminInstance
//       .delete(`/deletecategory/${category_id}`)
//       .then((response) => {
//         // Category successfully deleted, update your state or perform any necessary actions
//         console.log('Category deleted:', response.data);
//         // Now, you might want to update your category list state or perform any other actions
//       })
//       .catch((error) => {
//         // Handle the error in case the category deletion fails
//         console.error('Error deleting category:', error);
//       });
//   };
//   return (
//     <div className="mt-4 mb-4"> {/* Add margin-top and margin-bottom */}
//     <h2 className="text-2xl font-semibold mb-4">Categories</h2>

//     {/* Add Category button */}
//     <Link to="/admin/addcategory">
//       <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md mb-4">
//         Add Category
//       </button>
//     </Link>

//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border-r border-t border-gray-300">Category Name</th>
//             <th className="py-2 px-4 border-r border-t border-gray-300">Images</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//         {categoryList && categoryList.length > 0 ? (
//          categoryList.map((category, index) => (
//        <tr key={category.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//        <td className="py-2 px-4 border-r border-t border-gray-300">
//         {category.category_name}
//       </td>
//       <td className="py-2 px-4 border-r border-t border-gray-300">
//         <img
//           src={category.image}
//           alt={category.category_name}
//           className="h-12 w-12 rounded-full object-cover"
//         />
//       </td>
//       <td className="py-2 px-4 border-t">
//       <Link to="/admin/editcategory">
//         <button 
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md mr-2 transition duration-300 ease-in-out transform hover:scale-105"
//         >
//         Edit
//         </button>
//         </Link>
//         <Link to = "/admin/deletecategory">
//         <button
//         onClick={() => handleCategoryDelete(category.id)}
//         className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
//       >
//         Delete
//       </button>
//         </Link>
//       </td>
//     </tr>
//   ))
// ) : (
//   <tr>
//     <td colSpan="3">No categories found</td>
//   </tr>
// )}
        
//         </tbody>
//       </table>
//     </div>
//   </div>
// );
// }



// export default CategoryList;







