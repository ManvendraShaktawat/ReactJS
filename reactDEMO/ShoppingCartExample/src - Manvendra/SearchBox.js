import React from "react";

class SearchBox extends React.Component {
	constructor() {
		super();
		this.searchHandler = this.searchHandler.bind(this);
	}
	searchHandler() {
		if(this.refs.searchWatch.value.length>2 || this.refs.searchWatch.value.length===0) {
			this.props.search(this.refs.searchWatch.value);
		}
	}
	render() {
		return (
			<div className="row">
				<div className="col-md-4">
					<input type="text" className="form-control" ref="searchWatch" onChange={this.searchHandler}/>
				</div>
			</div>
		);
	}
}

export default SearchBox;