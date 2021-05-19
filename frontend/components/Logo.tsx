import Image from 'next/image';
import styled from 'styled-components';

const LogoStyles = styled.div`
  padding: 12px;
  background-color: rgb(66, 161, 203);
  border-radius: 25px;
`;

export default function Logo() {
  return (
    <LogoStyles>
      <Image src="/logo.svg" height={40} width={150} alt="Logo" />
    </LogoStyles>
  );
}
