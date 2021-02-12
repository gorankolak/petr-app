import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TableContainer from './PartnersStyle';
import db from '../../db';

function Partners() {
  const [baza, setBaza] = useState([]);

  useEffect(() => {
    const getKupci = async () => {
      const kupci = await db.kupci.toArray();

      setBaza(kupci);
      console.log(kupci);
    };

    getKupci();
  }, []);

  console.log(baza);

  return (
    <div>
      <h2>Kupci</h2>

      <TableContainer>
        <table>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Naziv</th>
              <th>Adresa</th>
              <th>##</th>
            </tr>
          </thead>
          <tbody>
            {/* <td>001</td> */}
            {/* <td>Prvi Kupac d.o.o.</td>
              <td>Osječka ulica 25, Osijek</td> */}

            {baza.map((item) => (
              <tr key={item.id}>
                <td>{item.naziv}</td>
                <td>{item.adresa}</td>
                <td>
                  <button>
                    {/* <Link to="/partner">Otvori</Link> */}
                    <Link
                      to={{
                        pathname: '/partner',
                        state: { id: item.id },
                      }}
                    >
                      Otvori
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
}

export default Partners;
