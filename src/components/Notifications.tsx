import React, { useState, useEffect } from 'react';


export type Notification = {
    id: string;
    message: string;
    date: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [shownNotifications, setShownNotifications] = useState<Notification[]>([]);

  function handleClose(id: string) {
    setShownNotifications(shownNotifications.filter(n => n.id !== id));
  }
  const handleShowNotifications = () => {
    setShownNotifications(notifications)
  }
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }

    const fetchNotifications = async () => {
      const response = await fetch('http://localhost:3001/api/notifications');
      const data = await response.json();
      console.log(data);
      console.log('hello');
      setNotifications(data);
      setShownNotifications(data);

      localStorage.setItem('notifications', JSON.stringify(data));
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <button onClick={handleShowNotifications}>See all notifications</button>

      {shownNotifications.map((notification, index) => (
        <div key={notification.id} style={{ background: 'lightblue', padding: '10px', margin: '10px' }}>
        <div style={{ float: 'right' }}>
          <button onClick={() => handleClose(notification.id)}>X</button>
        </div>
        {notification.message}
      </div>

      ))}
    </div>
  );
};

export default Notifications;
