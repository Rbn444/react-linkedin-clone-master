import { useEffect, useState } from 'react';
import './News.css';

function News() {
    //STATES
    const [articles, setArticles] = useState([])
    //----

    //USE EFFECT
    useEffect(() => {
        fetchArticle()
    }, [])
    //----------------------------------------------------------------

    const fetchArticle = async () => { // esegue la fetch degli articoli
        try {
            const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles")
            if (response.ok) {
                const json = await response.json()
                setArticles(json)
            }


        } catch (error) {
            console.log(error)
        }
    }

    const newsArticle = (heading, subtitle, url, key) => ( // serve a fare il map nel return 
        <div key={key} className="widgetsArticle">
            <div className="widgetsArticleLeft">
            </div>
            <div className="widgetsArticleRight">
                <li>{heading}</li>
                <p className='mt-2'>{subtitle} - <a className='text-success' href={url} target='_blank' rel='noreferrer'>GO</a></p>
            </div>
        </div>
    )


    //RENDER
    return (
        <div className="widgets my-2">
            <div className='widgetsHead'>
                <h2>LinkedIn News</h2>
            </div>
            <div className='scrollThis my-2'>
                {
                    articles.map(article => (
                        newsArticle(article.title, article.summary, article.url, article.id)
                    ))
                }
            </div>

        </div>


    )
}

export default News; 
