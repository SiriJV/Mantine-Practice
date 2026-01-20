import React, { useEffect, useState } from 'react';

interface Option {
  id: number | string;
  name: string;
}

interface Filters {
  category_id: string;
  city_id: string;
  tag_id: string;
  date: string;
  price_lte: string;
  order: string;
}

interface FilterProps {
  onFilterChange: (filters: Filters) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [categories, setCategories] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [tags, setTags] = useState<Option[]>([]);
  const [filters, setFilters] = useState<Filters>({
    category_id: '',
    city_id: '',
    tag_id: '',
    date: '',
    price_lte: '',
    order: 'date',
  });

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);

    fetch('http://localhost:3001/cities')
      .then(res => res.json())
      .then(setCities)
      .catch(console.error);

    fetch('http://localhost:3001/tags')
      .then(res => res.json())
      .then(setTags)
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
      <select name="category_id" value={filters.category_id} onChange={handleChange}>
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select name="city_id" value={filters.city_id} onChange={handleChange}>
        <option value="">All Cities</option>
        {cities.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select name="tag_id" value={filters.tag_id} onChange={handleChange}>
        <option value="">All Tags</option>
        {tags.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        placeholder="Date"
      />

      <input
        type="number"
        name="price_lte"
        min="0"
        value={filters.price_lte}
        onChange={handleChange}
        placeholder="Max Price"
      />

      <select name="order" value={filters.order} onChange={handleChange}>
        <option value="date">Sort by Date</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>
  );
};

export default Filter;
