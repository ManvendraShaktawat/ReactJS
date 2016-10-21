import React from "react";

import montanaListData from "./data/montanaList";
import tabListData from "./data/tabList";

import Navigation from "./Navigation";
import MontanaList from "./MontanaList";

class DesignerNews extends React.Component {
	constructor() {
		super();
		this.state = {
			montanaListData,
			tabListData,
			sortingType:"top"
		}
		this.tabChange = this.tabChange.bind(this);
	}
	tabChange(index) {
		var sortingType;
		var tabListData = this.state.tabListData.slice(0).map(tab => Object.assign({}, tab));

		for(var tab in tabListData) {
			tabListData[tab].isActive=false;
		}

		if(index===0) {
			sortingType="top";
			tabListData[0].isActive = true;
		}
		else if(index===1) {
			sortingType="recent";
			tabListData[1].isActive = true;
		}
		else if(index===2) {
			sortingType="starred";
			tabListData[2].isActive = true;
		}
		this.setState({
			tabListData,
	        sortingType
	    });
	}
	render() {
		return (
			<div id="container">
				<div id="header-container">
					<Navigation
						tabListData = {this.state.tabListData}
						tabChange = {this.tabChange}
					/>
				</div>
				<div id="page-container" className="wrap padded has-sidebar">
					<div id="page-main-content">
						<div id="page-main-content-inner" role="main">
							<MontanaList
								montanaListData = {this.state.montanaListData}
								sortingType = {this.state.sortingType}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DesignerNews;