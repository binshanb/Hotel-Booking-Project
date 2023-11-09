import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { adminInstance } from '../../../utils/Axios';

import { useDropzone } from 'react-dropzone';

import { Box, Button, TextField } from '@mui/material'; // Import Material-UI components

function EditCategory(){

  const { category_id } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [existingCategoryName, setExistingCategoryName] = useState(''); // Set with the existing category name
  const [existingCategoryImage, setExistingCategoryImage] = useState('');

  // Fetch the category data for the given categoryId and set it in the state
  useEffect(() => {
    // Make an API request to fetch the category details for editing
    adminInstance.get(`/categorylist/editcategory/${category_id}`).then((response) => {
      const categoryData = response.data;
      setCategoryName(categoryData.category_name);
      setExistingCategoryName(categoryData.category_name); // Set the existing category name
      setCategoryImage(categoryData.image); // Set the category name in state
      setExistingCategoryImage(categoryData.image); // Set the existing category image
      // You can set other category details as needed
    });
  }, [category_id]);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setCategoryImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category_name', existingCategoryName);
    formData.append('image', existingCategoryImage);
      // Check if the user made changes and append the modified data
     if (categoryName !== existingCategoryName) {
        formData.append('new_category_name', categoryName);
  }

       if (categoryImage !== existingCategoryImage) {
           formData.append('new_image', categoryImage);
  }

    try {
      const response = await adminInstance.put(`/categorylist/editcategory/${category_id}`);

      if (response.status === 200) {
        console.log('Category edited successfully');
        // Handle success, e.g., show a success message to the user
      } else {
        console.error('Error editing category');
        // Handle errors, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
            <form onSubmit={handleEditCategory}>
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-gray-700 text-xs font-bold mb-2">
                  Category Name
                </label>
                <TextField
                  fullWidth
                  variant="outlined"
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="rounded-full"
              >
                Save Changes
              </Button>
            </form>
          </div>
        </Box>
      );
    };
    
    export default EditCategory;
    
