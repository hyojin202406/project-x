import {
  FIND_TWEET_BY_ID_REQUEST,
  LIKE_TWEET_REQUEST,
  RETWEET_REQUEST,
  TWIT_CREATE_REQUEST,
  TWIT_DELETE_REQUEST,
  USER_LIKE_TWEETS_REQUEST,
  FIND_TWEET_BY_ID_FAILURE,
  LIKE_TWEET_FAILURE,
  TWIT_CREATE_FAILURE,
  TWIT_DELETE_FAILURE,
  USER_LIKE_TWEETS_FAILURE,
  GET_ALL_TWEETS_SUCCESS,
  GET_USERS_TWEETS_SUCCESS,
  USER_LIKE_TWEETS_SUCCESS,
  LIKE_TWEET_SUCCESS,
  TWIT_DELETE_SUCCESS,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  FIND_TWEET_BY_ID_SUCCESS,
  TWIT_CREATE_SUCCESS,
  REPLY_TWEET_SUCCESS,
} from './ActionType'

const initialState = {
  loading: false,
  data: null,
  error: null,
  twits: [],
  twit: null,
}

export const twitReducer = (state = initialState, action) => {
  switch (action.type) {
    case TWIT_CREATE_REQUEST:
    case TWIT_DELETE_REQUEST:
    case USER_LIKE_TWEETS_REQUEST:
    case LIKE_TWEET_REQUEST:
    case RETWEET_REQUEST:
    case FIND_TWEET_BY_ID_REQUEST:
      return { ...state, loading: true, error: null }

    case TWIT_CREATE_FAILURE:
    case TWIT_DELETE_FAILURE:
    case USER_LIKE_TWEETS_FAILURE:
    case LIKE_TWEET_FAILURE:
    case RETWEET_FAILURE:
    case FIND_TWEET_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload }

    case TWIT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        twits: [action.payload, ...state.twits],
      }

    case GET_ALL_TWEETS_SUCCESS:
    case GET_USERS_TWEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        twits: action.payload,
      }

    case USER_LIKE_TWEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        likedTwits: action.payload,
      }

    case LIKE_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        like: action.payload,
      }

    case TWIT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        twits: state.twits.filter((twit) => twit.id !== action.payload),
      }

    case RETWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        RETWIT: action.payload,
      }

    case FIND_TWEET_BY_ID_SUCCESS:
    case REPLY_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        twit: action.payload,
      }

    default:
      return state
  }
}
