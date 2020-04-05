import { useRouter } from "next/router";
import styled from "styled-components"; 
import GoogleFontLoader from 'react-google-font-loader';


export default () => (
  <header>
    <h1>COVID-19 Dashboard</h1>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/countries">Countries</Link>
      <Link href="/states">United States</Link>
    </nav>
  </header>
);

const Link = ({ children, href }) => {
  const router = useRouter();
  return (
    <a 
      className="header-link"
      href="#"
      onClick={e => {
        e.preventDefault();
        router.push(href);
      }}
    >
      {children}
    </a>
  );
};