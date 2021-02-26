import React from 'react';
import db from '../../services/db';

const ArticleAdd = () => {
  // copied from articles.js
  //....................
  //..............
  //.........
  const [tester, setTester] = useState([]);
  const [tog, setTog] = useState(false);

  // db.kupci.put({ naziv: 'Prva', adresa: 'Požeška 66, Osijek' });

  useEffect(() => {
    const getKupci = async () => {
      const kupci = await db.kupci.toArray();

      setTester(kupci);
    };

    getKupci();
  }, []);

  const deleter = async (id) => {
    db.kupci.delete(id);

    const kupci = await db.kupci.toArray();
    setTester(kupci);
  };

  const adder = async (data) => {
    db.kupci.put(data);

    const kupci = await db.kupci.toArray();
    setTester(kupci);
  };

  const toggling = () => {
    setTog(!tog);
  };

  const inputAdder = async (e) => {
    const tarValue = e.target.value;

    db.kupci.put({
      naziv: tarValue,
      adresa: `${tarValue} ulica`,
    });

    const kupci = await db.kupci.toArray();
    setTester(kupci);
  };

  return (
    <div>
      <h2>Dodavanje novih artikala</h2>
      <form action="">
        <label htmlFor="">Dodaj artikl</label>
        <input type="text" />
        <button>Dodaj</button>
      </form>

      <ul>
        {tester.map((item) => (
          <>
            <li key={item.naziv}>{item.naziv}</li>
            <li key={item.adresa}>{item.adresa}</li>
            <li>
              <button onClick={() => deleter(item.naziv)}>KLIK</button>
            </li>
          </>
        ))}

        {tog ? <li>Yeeees</li> : ''}
        <button onClick={() => toggling()}>Toggle me</button>

        <input type="text" onChange={inputAdder} />
        <button
          onClick={() => {
            adder({ naziv: 'Nova 22', adresa: 'Nova adresa 007, Zagreb' });
          }}
        >
          Addder
        </button>
      </ul>
    </div>
  );
};

export default ArticleAdd;
