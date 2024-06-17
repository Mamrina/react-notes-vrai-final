import React, { useEffect, useState } from 'react';

function Categories({ onCategoryChanged }) {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const categories = await CategoryManager.list();
    setCategories(categories);
  };

  const handleCategoryChange = (e) => {
    const categoryID = e.target.value;
    setSelectedCategory(categoryID);
    onCategoryChanged(categoryID);
  };

  const handleNewCategoryChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (newCategoryName.trim() === '') {
      window.alert('Le nom de la catégorie ne peut pas être vide');
      return;
    }
    setNewCategoryName('');
    fetchCategories();
  }

  return (
    <div>
      <label htmlFor="category">Sélectionner une catégorie :</label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Toutes les catégories</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.text}</option>
        ))}
      </select>
      <form onSubmit={handleCreateCategory}>
        <label htmlFor="newCategory">Nouvelle catégorie:</label>
        <input
          type="text"
          id="newCategory"
          value={newCategoryName}
          onChange={handleNewCategoryChange}
        />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default Categories;
