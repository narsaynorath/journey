import Image from 'next/image';
import styled from 'styled-components';

const LogoStyles = styled.div`
  padding: 8px;
  background-color: rgb(66, 161, 203);
`;

export default function Logo() {
  return (
    <LogoStyles>
      <Image src="/logo.svg" height={30} width={130} alt="Logo" />
    </LogoStyles>
  );
}
