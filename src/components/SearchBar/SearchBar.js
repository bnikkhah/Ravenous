import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			term: '',
			location: '',
			sortBy: 'best_match'
		};
		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);

		this.sortByOptions = {
			'Best Match': 'best_match',
			'Highest Rated': 'rating',
			'Most Reviewed': 'review_count'
		}
	}

	handleSortByChange(sortByOption){
		console.log(sortByOption);
		this.setState({
			sortBy: sortByOption
		}, () => {
			this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
		});
	}

	handleTermChange(e){
		this.setState({
			term: e.target.value
		});
	}

	handleLocationChange(e){
		this.setState({
			location: e.target.value
		});
	}

	handleSearch(e){
		this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
		e.preventDefault();
	}

	getSortByClass(sortByOption){
		if (this.state.sortBy === sortByOption){
			return 'active';
		}else{
			return '';
		}
	}

	renderSortByOptions(){
		return Object.keys(this.sortByOptions).map(sortByOption => {
			let sortByOptionValue = this.sortByOptions[sortByOption];
			return <li key={sortByOptionValue} 
			className={this.getSortByClass(sortByOptionValue)} 
			onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>{sortByOption}</li>;
		});
	}

	handleEnterKey(e){
		if (e.keyCode === 13){
			document.getElementById('search').click();
		}
	}

	render(){
		return (
			<div className='SearchBar'>
				<div className='SearchBar-sort-options'>
					<ul>
						{this.renderSortByOptions()}
					</ul>
				</div>
				<div className='SearchBar-fields'>
					<input placeholder='Search Businesses' onChange={this.handleTermChange} onKeyDown={this.handleEnterKey}/>
					<input placeholder='Where?' onChange={this.handleLocationChange} onKeyDown={this.handleEnterKey}/>
				</div>
				<div className='SearchBar-submit'>
					<a id='search' onClick={this.handleSearch}>Let's Go</a>
				</div>
			</div>
		);
	}
}

export default SearchBar;