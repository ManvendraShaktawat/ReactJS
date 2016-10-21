import React from "react";

class MontanaListItem extends React.Component {
	render() {
		return (
			<li className={this.props.isStarred?"story-list-item montana-list-item story-starred":"story-list-item montana-list-item"} data-story-id="75738">
				<div className="list-story-grouper list-story-upvote-grouper">
				<button aria-label="Upvote this story to 14 points" className="story-upvote-button toggle-login">
					<svg aria-label="up-arrow" className="upvote-up-arrow" height="7" id="svg-up-arrow" role="img" version="1.1" viewBox="0 0 11 7" width="11">
						<path d="m.202 5.715c-.367.417-.217.755.329.755h9.438c.549 0 .702-.33.338-.742l-4.41-4.985c-.363-.41-.947-.412-1.322.013l-4.373 4.96"/>
					</svg>
					<span className="story-upvote-button-number unvoted-number">{this.props.upvote.countBeforeUpvote}</span><span className="story-upvote-button-number upvoted-number">{this.props.upvote.countAfterUpvote}</span>
				</button>
				</div>
				<div className="list-story-grouper list-story-main-grouper">
					<a href="#" className="montana-item-title" > {this.props.story} <span className="list-story-domain">{this.props.storyDomain}</span></a>
					<div className="montana-item-meta">
						<a href="#" className="list-story-comment-count">{this.props.commentsCount} comments</a>
						<span className="montana-item-meta-bullet">&bull;</span>
						<abbr className="list-story-time-ago time-ago">{this.props.timeAgo} hours ago</abbr>
						<span>from <a href="#">{this.props.from}</a>{this.props.destination}</span>
					</div>
				</div>
				<div className="list-story-grouper list-story-star-grouper">
					<a href="#" className="story-star-button">
					    <svg aria-label="star" height="15" id="svg-star" role="img" version="1.1" viewBox="0 0 15 15" width="15">
					        <path d="m7.5 11.453l4.635 2.797-1.23-5.273 4.095-3.547-5.393-.457-2.108-4.973-2.108 4.973-5.393.457 4.095 3.547-1.23 5.273 4.635-2.797"></path>
					    </svg>
					</a>
				</div>
			</li>
		);
	}
}

export default MontanaListItem;