import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import db from '../../services/db';

import { MainFooter } from '../../components/MainFooter/MainFooter';
import { Button } from '../../components/Components';
import { DefaultTable } from '../../components/Table/Table'
import AddArticlesStyle from './AddArticlesStyle';

const { dialog } = window.require('electron').remote;

const AddArticles = () => {
    const [articlesDb, setArticlesDb] = useState([]);
    const [invoiceArticles, setInvoiceArticles] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [measure, setMeasure] = useState('kom');
    const [total, setTotal] = useState(250);

    useEffect(() => {
        const getArticles = async () => {
            const articles = await db.articles.toArray();
            setArticlesDb(articles);
        }

        getArticles();
    });

    const submitArticle = (e) => {
        e.preventDefault();

        const article = {
            id: id,
            name: name,
            type: type,
            quantity: quantity,
            measure: measure,
            total: total
        }

        setInvoiceArticles([...invoiceArticles, article]);
    }

    const path = 'add-invoice-articles';

    const COLUMNS = [
        {
          Header: 'Br.',
          accessor: 'id',
        },
        {
          Header: 'Naziv',
          accessor: 'name',
        },
        {
          Header: 'Vrsta',
          accessor: 'type',
        },
        {
          Header: 'Količina',
          accessor: 'quantity',
        },
        {
          Header: 'Mjerna jedinica',
          accessor: 'measure',
        },
        {
          Header: 'Cijena',
          accessor: 'total',
        },
      ];

    return (
        <AddArticlesStyle>
            <form onSubmit={submitArticle}>
                <h2>Dodaj artikle</h2>
                <div className="form-wrapper">
                    <div className="form-column">
                        <div className="form-item">
                            <label>Artikl</label>
                            <div className="half">
                                <select name="articles" 
                                    onChange={(e) => {
                                        const article = articlesDb.find(art => art.name = e.target.value)
                                        console.log(article);
                                        console.log(articlesDb);
                                    }}>
                                    {articlesDb.map((article) => 
                                        <option value={article.name}>{article.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-item">
                            <label>Količina</label>
                            <div className="half">
                                <input type="number" onChange={(e) => setQuantity(e.target.value)}></input> 
                            </div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-item">
                                <Button type="submit">Dodaj artikl</Button>
                        </div>
                    </div>
                </div>    
            </form>   
            <DefaultTable path={path} appData={invoiceArticles} tableColumns={COLUMNS} />
        </AddArticlesStyle>
    )
}

export default AddArticles;