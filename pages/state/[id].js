import { useRouter } from 'next/router'; 

import Header from "../../components/Header";
import StateDetail from "../../components/StateDetail"; 

const State = () => { 
  const router = useRouter() 
  const { id } = router.query; 

  if (!id) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <StateDetail id={id} />
    </>
  )
}

export default State; 