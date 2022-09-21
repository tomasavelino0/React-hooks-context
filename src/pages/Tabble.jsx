import React, { useContext } from 'react';
import TabbleContext from '../context/TabbleContext';

function Tabble() {
  const {
    nameFilterHandler,
    nameFilter,
    planetFiltered,
  } = useContext(TabbleContext);
  return (
    <div>
      <header>
        <label htmlFor="nameFilter">
          <input
            data-testid="name-filter"
            onChange={ nameFilterHandler }
            value={ nameFilter }
            name="nameFilter"
            type="text"
            placeholder="Pesquisa"
          />
        </label>
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
              <td>{planet.name}</td>
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
