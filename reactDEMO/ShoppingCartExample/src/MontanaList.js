import React from "react";

import MontanaListItem from "./MontanaListItem";

class MontanaList extends React.Component {
	render() {
		if(this.props.sortingType === "top") {
			this.props.montanaListData.sort(function(obj1, obj2) {
				return (obj2.upvote.countBeforeUpvote-obj1.upvote.countBeforeUpvote);
			});
		}
		else if(this.props.sortingType === "starred") {

		}
		else if(this.props.sortingType === "recent") {
			this.props.montanaListData.sort(function(obj1, obj2) {
				return (obj1.timeAgo-obj2.timeAgo);
			});
		}

		var itemList = this.props.montanaListData.map(function(listItem, index){
			return (
				<MontanaListItem key={index} {...listItem}/>
			);
		});

		return (
			<div className="montana-list" id="top-stories-list">
				<ul className="montana-list-items">
					{itemList}
				</ul>
			</div>
		);
	}
}

export default MontanaList;