import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Quote.css';
// import { Icon } from 'semantic-ui-react';

export default class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            currentQuote: '',
            currentAuthor: '',
            colors: ['#32a852', '#2f5439', '#242d2e', '#1f5d63', '#2e1852', '#170338', '#571350', '#1d7085', '#734511', '#36210a', '#527230', '#1e7385', '#734621', '#36310b'],
            backGroundColor: '#333'
        }
        this.generateRandomQuote = this.generateRandomQuote.bind(this);
        this.tweetQuote = this.tweetQuote.bind(this);
    }

    componentDidMount() {
        let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

        axios.get(url)
         .then(data => {
            return data.data;
         })
         .then( res => {
             this.setState({
                 quotes: res.quotes
             })
             this.setState({
                currentQuote: this.state.quotes[0].quote,
                currentAuthor: this.state.quotes[0].author
             })
         })
         document.body.style.backgroundColor =  '#333';
    }

    generateRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
        const randomColorIndex = Math.floor(Math.random() * this.state.colors.length);
        this.setState({
            currentQuote: this.state.quotes[randomIndex].quote,
            currentAuthor: this.state.quotes[randomIndex].author,
            backGroundColor: this.state.colors[randomColorIndex]
        })
        document.body.style.backgroundColor =  this.state.colors[randomColorIndex];
        
    }
    
    tweetQuote() {
        const BASE_URL = 'https://twitter.com/intent/tweet?text=' + this.state.currentQuote;
        window.open(BASE_URL);
    }

    render() {
        const data = {
            quote: this.state.currentQuote,
            author: this.state.currentAuthor
        }
        
        return (

            <div id="wrapper">
                <div id="quote-box">
                    <div className="quote-text">
                        <FontAwesomeIcon icon={faQuoteLeft} style={{color: this.state.backGroundColor}} />
                        <span id="text" style={{color: this.state.backGroundColor}} >{data.quote}</span>
                        <FontAwesomeIcon icon={faQuoteRight} style={{color: this.state.backGroundColor}} />
                    </div>
                    <div className="quote-author">
                        ~ <span id="author" style={{color: this.state.backGroundColor}}>{data.author}</span>
                    </div>
                    <div className="buttons">
                        
                        <a
                            id="tweet-quote" 
                            title="Tweet this quote!"
                            href="https://twitter.com/intent/tweet"
                            onClick={this.tweetQuote}
                            target="_blank"> <FontAwesomeIcon size="2x" icon={faTwitter} />Tweet Quote
                        </a>
                        <a  href="https://embed.tumblr.com/share" color="primary" id="tumblr-quote" title="Post this quote on tumblr!" target="_blank" onClick={() => {window.open('https://embed.tumblr.com/share')}}>
                    
                        </a>
                        <Button style={{backgroundColor: this.state.backGroundColor}} variant="contained" color="primary"  id="new-quote" onClick={this.generateRandomQuote}>New quote</Button>
                    </div>
                </div>
            </div>
        )
    }
}
