import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  price: number | string | null; // Accept string in case backend returns string
}

export default function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/events')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch events');
        return res.json();
      })
      .then((data: Event[]) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Events</h2>
      {events.length === 0 && <p>No events found</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> — Price: {event.price != null ? Number(event.price).toFixed(2) : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}