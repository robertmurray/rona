import { useRouter } from "next/router";
import GoogleFontLoader from 'react-google-font-loader';

export default () => (
  <header>
    <Link href="/">Home</Link>
    <Link href="/countries">Countries</Link>
    <Link href="/states">States</Link>
  </header>
);

const Link = ({ children, href }) => {
  const router = useRouter();
  return (
    <a
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
