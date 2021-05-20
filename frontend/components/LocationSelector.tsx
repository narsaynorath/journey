import styled from 'styled-components';

const LocationSelectorStyles = styled.div`
  background: white;
  width: 500px;
  height: 300px;
  border-radius: 25px;
  padding: 24px;
`;

export default function LocationSelector() {
  return (
    <LocationSelectorStyles>
      Select your trip destination!
    </LocationSelectorStyles>
  );
}
