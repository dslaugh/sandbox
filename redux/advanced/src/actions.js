const fetch = require('cross-fetch');

const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
function selectSubreddit(subreddit) {
	return {
		type: SELECT_SUBREDDIT,
		subreddit,
	};
}

const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
function invalidateSubreddit(subreddit) {
	return {
		type: INVALIDATE_SUBREDDIT,
		subreddit,
	};
}

const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(subreddit) {
	return {
		type: REQUEST_POSTS,
		subreddit,
	};
}

const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(subreddit, json) {
	return {
		type: RECEIVE_POSTS,
		subreddit,
		posts: json.data.children.map(child => child.data),
		receivedAt: Date.now(),
	};
}

function fetchPosts(subreddit) {
	return (dispatch) => {
		dispatch(requestPosts(subreddit));
		return fetch(`https://www.reddit.com/r/${subreddit}.json`)
			.then(response => response.json())
			.then(json =>	dispatch(receivePosts(subreddit, json)));
	};
}

function shouldFetchPosts(state, subreddit) {
	const posts = state.postsBySubreddit[subreddit];
	if (!posts) {
		return true;
	} else if (posts.isFetching) {
		return false;
	} else {
		return posts.didInvalidate;
	}
}

function fetchPostsIfNeeded(subreddit) {
	return (dispatch, getState) => {
		if (shouldFetchPosts(getState(), subreddit)) {
			return dispatch(fetchPosts(subreddit));
		} else {
			return Promise.resolve();
		}
	}
}

module.exports = {
	SELECT_SUBREDDIT,
	INVALIDATE_SUBREDDIT,
	REQUEST_POSTS,
	RECEIVE_POSTS,
	selectSubreddit,
	invalidateSubreddit,
	fetchPostsIfNeeded,
};
