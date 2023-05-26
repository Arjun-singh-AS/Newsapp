import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }
  async componentDidMount(){
    let url="https://newsapi.org/v2/everything?q=tesla&from=2023-03-16&sortBy=publishedAt&apiKey=dd2e3be06c23447bb61b364bc28a954b&page=1&pageSize=12"
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({articles: parsedData.articles,totalArticles:parsedData.totalResults})
  }
  handlePrevClick=async ()=>{
    let url=`https://newsapi.org/v2/everything?q=tesla&from=2023-03-16&sortBy=publishedAt&apiKey=dd2e3be06c23447bb61b364bc28a954b&page=${this.state.page-1}&pageSize=12`
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({page: this.state.page-1,articles:parsedData.articles})
  }
  handleNextClick=async ()=>{
    
    if(Math.ceil(this.state.totalResults/12)<this.state.page+1){}
    else{
    let url=`https://newsapi.org/v2/everything?q=tesla&from=2023-03-16&sortBy=publishedAt&apiKey=dd2e3be06c23447bb61b364bc28a954b&page=${this.state.page+1}&pageSize=12`
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({page: this.state.page+1,articles:parsedData.articles})
    }
  }
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">Daily News Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4 my-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

