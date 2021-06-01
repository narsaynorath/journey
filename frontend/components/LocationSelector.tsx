import { useQuery } from '@apollo/client';
import { debounce } from 'debounce';
import gql from 'graphql-tag';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { useState } from 'react';
import styled from 'styled-components';

const LocationSelectorStyles = styled.div`
  background: white;
  width: 500px;
  min-height: 300px;
  border-radius: 25px;
  padding: 24px;
`;

const FieldStyles = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;

  input {
    margin: 8px 0;
    width: 100%;
  }
`;

const FooterStyles = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;

const GET_CITIES_BY_COUNTRY_QUERY = gql`
  query {
    countries {
      name
      cities {
        name
      }
    }
  }
`;

export default function LocationSelector() {
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredCities, setFilteredCities] = useState(null);
  const { data, loading, error } = useQuery(GET_CITIES_BY_COUNTRY_QUERY, {
    context: { clientName: 'everbase' },
  });

  let content;

  if (loading) {
    content = <p>Loading</p>;
  } else if (error) {
    content = <p>Error!</p>;
  } else {
    // Searches for both City and Country name
    // If Country includes the search term, include all of its cities
    const searchCity = (event: { query: string }) => {
      let query = event.query;
      let _filteredCities = [];

      data?.countries.forEach((country) => {
        if (country.name.toLowerCase().includes(query.toLowerCase())) {
          _filteredCities.push({ ...country });
        } else {
          let filteredItems = country.cities.filter(
            (item) =>
              item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
          );
          if (filteredItems && filteredItems.length) {
            _filteredCities.push({
              ...country,
              ...{
                cities: filteredItems.map((city) => ({
                  ...city,
                  countryName: country.name,
                })),
              },
            });
          }
        }
      });

      setFilteredCities(_filteredCities);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitting!');
    };

    content = (
      <form onSubmit={handleSubmit}>
        <h1>Let's plan your next adventure!</h1>
        <FieldStyles>
          <label htmlFor="destination" className="p-d-block">
            Destination
          </label>
          <AutoComplete
            inputId="destination"
            name="destination"
            placeholder="Where are you going?"
            value={selectedCity}
            suggestions={filteredCities}
            completeMethod={debounce(searchCity, 200)}
            field="name"
            onChange={(e) => setSelectedCity(e.value)}
            optionGroupChildren="cities"
            optionGroupLabel="name"
            onSelect={({ value }) =>
              setSelectedCity(`${value.name}, ${value.countryName}`)
            }
          />
        </FieldStyles>
        <FooterStyles>
          <Button
            type="submit"
            label="Start Planning"
            icon="pi pi-calendar"
            iconPos="right"
          />
        </FooterStyles>
      </form>
    );
  }

  return <LocationSelectorStyles>{content}</LocationSelectorStyles>;
}
