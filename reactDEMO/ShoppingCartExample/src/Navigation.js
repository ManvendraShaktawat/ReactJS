import React from "react";

class Navigation extends React.Component {
	constructor() {
		super();
		this.tabChange = this.tabChange.bind(this);
	}

	tabChange(index) {
		this.props.tabChange(index);
	}
	
	render() {
		var _self=this;
		var listItem = this.props.tabListData.map(function(listItem,index){
			return (
				<li key={index}><a href="#" onClick={_self.tabChange.bind(this,index)} className={listItem.isActive?"active":""}>{listItem.tabName}</a></li>
			);
		});
		return (
			<header id="site-header">
				<nav id="header-sub-navigation-container">
					<div className="wrap padded">
						<ul id="sub-navigation-list-items">
							<div id="sub-navigation-visible-items">
								{listItem}
							</div>
						</ul>
					</div>
				</nav>
			</header>
		);
	}
}

export default Navigation;