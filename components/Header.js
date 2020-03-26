import { useRouter } from "next/router";
import GlobalStyle from "../styles/global";

export default () => (
  <>
    <GlobalStyle />
    <header>
      <Link href="/">Home</Link>
      <Link href="/countries">Countries</Link>
      <Link href="/states">States</Link>
    </header>
  </>
);

const Link = ({ children, href }) => {
  const router = useRouter();
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        // typically you want to use `next/link` for this usecase
        // but this example shows how you can also access the router
        // and use it manually
        router.push(href);
      }}
    >
      {children}
    </a>
  );
};
