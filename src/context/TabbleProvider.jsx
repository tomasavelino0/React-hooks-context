import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchStarWarsApi from '../services/starWarsApi';
import TabbleContext from './TabbleContext';

function TabbleProvider({ children }) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const planetData = async () => {
      const data = await fetchStarWarsApi();
      const mapPlanetDeletResidents = data.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setApiData(mapPlanetDeletResidents);
    };
    planetData();
  }, []);

  const contextType = {
    apiData,
  };

  return (
    <TabbleContext.Provider value={ contextType }>
      {children}
    </TabbleContext.Provider>
  );
}

TabbleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabbleProvider;
