import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings1 = () => {
  const [settings1, setSettings1] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/stuffs');
        const data = response.data.map((stuff) => ({
          ipAddress: stuff.ip_address,
          location: stuff.location,
          limit: parseInt(localStorage.getItem(`limit-${stuff.ip_address}`), 10) || 3,
        }));
        setSettings1(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateLimitValue = (ipAddress, newLimit) => {
    setSettings1((prevSettings) =>
      prevSettings.map((settings) =>
        settings.ipAddress === ipAddress
          ? { ...settings, limit: newLimit }
          : settings
      )
    );
    localStorage.setItem(`limit-${ipAddress}`, newLimit.toString());
  };

  return (
    <div>
      <div className="cards-container" style={{ display: 'flex', gap: '20px' }}>
        {settings1.map((settings) => (
          <CardSettings
            key={settings.ipAddress}
            settings={settings}
            updateLimitValue={updateLimitValue}
          />
        ))}
      </div>
    </div>
  );
};

const CardSettings = ({ settings, updateLimitValue }) => {
  const { ipAddress, location, limit } = settings;

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    updateLimitValue(ipAddress, newLimit);
  };

  const handleSetLimit = () => {
    // Add logic to handle setting the limit
    // This is a placeholder, you can customize it based on your needs
    console.log(`Setting limit for ${ipAddress} to ${limit}`);
  };

  return (
    <div className="card" style={{ width: '300px', height: '250px' }}>
      <h2>Location: {location}</h2>
      <label>Limit:</label>
      <input
        type="number"
        value={limit}
        onChange={handleLimitChange}
        style={{ width: '50%' }}
      />
      <button
        disabled={!ipAddress}
        onClick={handleSetLimit}
        style={{ width: '50%', marginTop: '10px' }}
      >
        Set
      </button>
    </div>
  );
};

export default Settings1;
