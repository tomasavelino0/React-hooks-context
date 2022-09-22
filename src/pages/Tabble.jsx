import React, { useContext } from 'react';
import TabbleContext from '../context/TabbleContext';

function Tabble() {
  const {
    nameFilterHandler,
    planetFiltered,
    handleChange,
    filterNumeric,
    selectedFilter,

  } = useContext(TabbleContext);

  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];
  return (
    <div>
      <header>
        <label htmlFor="nameFilter">
          <input
            data-testid="name-filter"
            onChange={ nameFilterHandler }
            name="nameFilter"
            type="text"
            placeholder="Pesquisa"
          />
        </label>
        <select onChange={ handleChange } data-testid="column-filter" name="column">
          {columns.filter((column) => !selectedFilter.includes(column)).map((filter) => (
            <option key={ filter } value={ filter }>
              {filter}
            </option>
          ))}
        </select>
        <select
          onChange={ handleChange }
          data-testid="comparison-filter"
          name="comparison"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="numberFilter">
          <input
            onChange={ handleChange }
            defaultValue={ 0 }
            name="value"
            data-testid="value-filter"
            type="number"
          />
        </label>
        <button
          onClick={ filterNumeric }
          data-testid="button-filter"
          type="button"
        >
          Filtrar

        </button>

      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { planetFiltered.map((planet, i) => (
            <tr key={ i }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default Tabble;
