import { render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import mockData from './mockData';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('testes TabblePage', () => {
  test('verifica se renderiza a tabela', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('testa se renderiza os campos de filtro', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const nameFilter = screen.getByPlaceholderText(/pesquisa/i)
    expect(nameFilter).toBeInTheDocument();
    const headerColumn = screen.getAllByRole('columnheader');
    expect(headerColumn).toHaveLength(13);
  });
  test('verifica se filtra corretamente', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const nameFilter = screen.getByPlaceholderText(/pesquisa/i)
    expect(nameFilter).toBeInTheDocument();
    const notFilteredItem = screen.getByText(/hoth/i)
    userEvent.type(nameFilter, 'ndor')
    expect(nameFilter).toHaveValue('ndor')
    expect(notFilteredItem).not.toBeInTheDocument()
  })
  test('verifica os filtros numericos', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toBeInTheDocument();
    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();
    const valorInput = screen.getByTestId('value-filter');
    expect(valorInput).toBeInTheDocument();
    const buttonFilter = screen.getByTestId('button-filter');
    expect(buttonFilter).toBeInTheDocument();
    userEvent.selectOptions(columnFilter, 'diameter')
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.type(valorInput, 20000)
    userEvent.click(buttonFilter);
    const itemFiltered = screen.getByText(/bespin/i)
    expect(itemFiltered).toBeInTheDocument();
  })
  test('test do filtro menor que', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const FilterColumn = screen.getByTestId('column-filter');
      const FilterComparison = screen.getByTestId('comparison-filter');
      const FilterValue = screen.getByTestId('value-filter');
      const FilterBtn = screen.getByTestId('button-filter');

      userEvent.selectOptions(FilterColumn, 'population');
      userEvent.selectOptions(FilterComparison, 'menor que');
      userEvent.type(FilterValue, '1000000');
      userEvent.click(FilterBtn);

      const tablePlanets = screen.getAllByTestId('planet-name');
      expect(tablePlanets).toHaveLength(2);
  })
  test('test do filtro maior que', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const FilterColumn = screen.getByTestId('column-filter');
      const FilterComparison = screen.getByTestId('comparison-filter');
      const FilterValue = screen.getByTestId('value-filter');
      const FilterBtn = screen.getByTestId('button-filter');

      userEvent.selectOptions(FilterColumn, 'population');
      userEvent.selectOptions(FilterComparison, 'maior que');
      userEvent.type(FilterValue, '2000000000');
      userEvent.click(FilterBtn);

      const tablePlanets = screen.getAllByTestId('planet-name');
      expect(tablePlanets).toHaveLength(2);
  })
  test('test do filtro igual a', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());
    const FilterColumn = screen.getByTestId('column-filter');
      const FilterComparison = screen.getByTestId('comparison-filter');
      const FilterValue = screen.getByTestId('value-filter');
      const FilterBtn = screen.getByTestId('button-filter');

      userEvent.selectOptions(FilterColumn, 'population');
      userEvent.selectOptions(FilterComparison, 'igual a');
      userEvent.type(FilterValue, '1000000000000');
      userEvent.click(FilterBtn);

      const tablePlanets = screen.getAllByTestId('planet-name');
      expect(tablePlanets).toHaveLength(1);
  })

});
