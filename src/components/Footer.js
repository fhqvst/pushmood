import React from 'react';
import {
  Flex,
  Link,
  styled
} from 'reakit';

const Footer = (props) =>
  <Flex {...props}>
    This site is licensed under&nbsp;<Link href="http://www.wtfpl.net/">WTFPL</Link>.
  </Flex>

export default styled(Footer)`
  font-size: 0.75em;
  margin: 4em auto; 
  opacity: 0.5;
  justify-content: center;
`;
