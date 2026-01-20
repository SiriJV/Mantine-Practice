import React, { useState, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  price: number;  // converted to number
  date: string;
  city_id: string;  // city name
  restaurant_id: number;
  category_id: number;
  // add other fields if needed
}

export default function EventFilter() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState({
    city: '',
    restaurant: '',
    category: '',
    price: '',
    date: '',
    order: 'date', // default ordering by date
  });

  const fetchEvents = async () => {
    const params = new URLSearchParams();

    if (filters.city) params.append('city_id', filters.city);
    if (filters.restaurant) params.append('restaurant_id', filters.restaurant);
    if (filters.category) params.append('category_id', filters.category);
    if (filters.price) params.append('price_lte', filters.price);
    if (filters.date) params.append('date', filters.date);
    if (filters.order) params.append('order', filters.order);

    try {
      const res = await fetch(`http://localhost:3001/events?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();

      // Convert price string to number
      const converted = data.map((event: any) => ({
        ...event,
        price: Number(event.price),
      }));

      setEvents(converted);
    } catch (err) {
      console.error(err);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Filter Events</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          fetchEvents();
        }}
      >
        <input
          type="number"
          name="restaurant"
          placeholder="restaurang id"
          value={filters.restaurant}
          onChange={handleChange}
          min={1}
        />
        <input
          type="text"
          name="city"
          placeholder="stad"
          value={filters.city}
          onChange={handleChange}
        />
        <input
          type="number"
          name="category"
          placeholder="kategori id"
          value={filters.category}
          onChange={handleChange}
          min={1}
        />
        <input
          type="number"
          name="price"
          placeholder="max pris"
          value={filters.price}
          onChange={handleChange}
          min={0}
          step="0.01"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
        />
        <select name="order" value={filters.order} onChange={handleChange}>
          <option value="date">Sortera på datum</option>
          <option value="price">Sortera på pris</option>
        </select>
        {/* <button type="submit">Apply Filters</button> */}
      </form>

      <h3>Events</h3>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> — {event.city_id} — {event.price.toFixed(0)}kr — {new Date(event.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
