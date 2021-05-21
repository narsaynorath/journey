import Head from 'next/head';
import styled from 'styled-components';

import LocationSelector from '../components/LocationSelector';

const HomePageStyles = styled.div`
  flex: 1;
  width: 100%;
  background-image: url('/travel_images/sydney.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <HomePageStyles>
      <Head>
        <title>Journey</title>
        <meta
          name="description"
          content="A journey starts with just one step."
        />
        <link rel="icon" href="/kawaii_earth.svg" />
      </Head>
      <LocationSelector />
    </HomePageStyles>
  );
}
