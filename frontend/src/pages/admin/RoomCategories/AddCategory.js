import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import {adminInstance} from '../../../utils/Axios';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    // Set the first accepted file as the category image
    if (acceptedFiles && acceptedFiles.length > 0) {
      setCategoryImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData();
    formData.append('category_name', categoryName);
    formData.append('image', categoryImage);
      

      
  try {
    const response = await adminInstance.post('/addcategory',formData);

    if (response.status=== 201) {
      // Category created successfully, you can show a success message if needed
      console.log('Category added successfully');

      // Clear the form fields and reset the state
      setCategoryName('');
      setCategoryImage(null);

      // Reload the page to show the updated list of categories
      window.location.reload();
    } else {
      // Handle errors and show an error message
      console.error('Error adding category');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleDeleteCategory = async (category_id) => {
  try {
    const response = await adminInstance.delete(`/deletecategory/${category_id}`);

    if (response.status === 200) {
      // Category deleted successfully, you can show a success message if needed
      console.log('Category deleted successfully');

      // Reload the page to show the updated list of categories
      window.location.reload();
    } else {
      // Handle errors and show an error message
      console.error('Error deleting category');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  return (
<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <h2 className="text-2xl font-bold mb-4">Add Category</h2>
  <form onSubmit={handleAddCategory}>
    <div className="mb-4">
    <label htmlFor="categoryName" className="block text-gray-700 text-xs font-bold mb-2">
  Category Name
</label>

      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id="categoryName"
        value={categoryName}
        onChange={handleCategoryNameChange}
        placeholder="Enter category name"

      />
    </div>
    <div {...getRootProps()} className="mb-4 p-4 border-dashed border-2 border-gray-400 rounded text-center">
      <input {...getInputProps()} />
      {categoryImage ? (
        <p className="text-gray-700">Selected Image: {categoryImage.name}</p>
      ) : (
        <p className="text-gray-700">Drag 'n' drop an image here, or click to select an image.</p>
      )}
    </div>
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Add
    </button>
  </form>
  <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Delete Category</h2>
        <p className="text-gray-700 mb-2">
          To delete a category, provide the category ID and click the "Delete" button.
        </p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="category_id"
          placeholder="Category ID"
        />
        <button
          onClick={() => {
            const categoryId = document.getElementById('category_id').value;
            if (categoryId) {
              handleDeleteCategory(categoryId);
            }
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};


export default AddCategory;
