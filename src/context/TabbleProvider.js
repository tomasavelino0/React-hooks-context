import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchStarWarsApi from '../services/starWarsApi';
import TabbleContext from './TabbleContext';

function TabbleProvider({ children }) {
  const [apiData, setApiData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [planetFiltered, setPlanetFiltered] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [selectedFilter, setSelectFilter] = useState([]);

  const checkComparison = (col, comp, val) => {
    switch (comp) {
    case 'maior que': return col > val;
    case 'menor que': return col < val;
    case 'igual a': return col === val;
    default:
    }
  };

  const filterNumeric = () => {
    const { column, comparison, value } = filterByNumericValues;
    const filter = planetFiltered
      .filter((planet) => checkComparison(+planet[column], comparison, +value));
    setPlanetFiltered(filter);
    setSelectFilter(column);
    setFilterByNumericValues({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });

    console.log(selectedFilter);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterByNumericValues({
      ...filterByNumericValues,
      [name]: value,
    });
  };

  const nameFilterHandler = ({ target }) => {
    const { value } = target;
    setNameFilter(value);
  };

  useEffect(() => {
    const filter = apiData.filter((planet) => planet.name.includes(nameFilter));
    setPlanetFiltered(filter);
  }, [nameFilter, apiData]);

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
    ...filterByNumericValues,
    nameFilterHandler,
    planetFiltered,
    handleChange,
    filterNumeric,
    selectedFilter,
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
