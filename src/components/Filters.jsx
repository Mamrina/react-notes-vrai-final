import { useState } from "react";

export default function Filters({filters, onFilterChanged, categories}) {

  const onKeywordChanged = e => {
    const keyword = e.target.value;
    onFilterChanged(keyword, filters.categories);
  };

  const onCategoryChanged = e => {
    const category = e.target.value;
    onFilterChanged(filters.keyword, category);
  };

  return (
    <form>
      <fieldset>
        <legend>Recherche une note</legend>
        <input name="keyword" type="search" placeholder="Rechercher par mot" value={filters.keyword} onChange={onKeywordChanged} />
        <select name="category" value={filters.category} onChange={onCategoryChanged}>
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.text}
            </option>
          ))}
        </select>
      </fieldset>
    </form>
  );
}
