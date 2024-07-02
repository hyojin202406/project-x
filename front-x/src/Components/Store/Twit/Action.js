import { api } from '../../config/api'
import {
  FIND_TWEET_BY_ID_FAILURE,
  FIND_TWEET_BY_ID_SUCCESS,
  GET_ALL_TWEETS_FAILURE,
  GET_ALL_TWEETS_SUCCESS,
  GET_USERS_TWEETS_FAILURE,
  GET_USERS_TWEETS_SUCCESS,
  LIKE_TWEET_FAILURE,
  LIKE_TWEET_SUCCESS,
  REPLY_TWEET_FAILURE,
  REPLY_TWEET_SUCCESS,
  RETWEET_SUCCESS,
  TWIT_CREATE_FAILURE,
  TWIT_CREATE_SUCCESS,
  TWIT_DELETE_FAILURE,
  TWIT_DELETE_SUCCESS,
  USER_LIKE_TWEETS_FAILURE,
  USER_LIKE_TWEETS_SUCCESS,
} from './ActionType'

export const getAllTweets = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/twits/')
    console.log('get all twits : ', data)
    dispatch({ type: GET_ALL_TWEETS_SUCCESS, payload: data })
  } catch (error) {
    console.log('catch error - ', error)
    dispatch({ type: GET_ALL_TWEETS_FAILURE, payload: error.message })
  }
}

export const getUsersTweets = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/twits/user/${userId}`)
    console.log('getUsersTweets : ', data)
    dispatch({ type: GET_USERS_TWEETS_SUCCESS, payload: data })
  } catch (error) {
    console.log('catch error - ', error)
    dispatch({ type: GET_USERS_TWEETS_FAILURE, payload: error.message })
  }
}

export const findTwitsByLikeContaineUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/twits/user/${userId}/likes`)
    console.log('findTwitsByLikeContaineUser : ', data)
    dispatch({ type: USER_LIKE_TWEETS_SUCCESS, payload: data })
  } catch (error) {
    console.log('catch error - ', error)
    dispatch({ type: USER_LIKE_TWEETS_FAILURE, payload: error.message })
  }
}

export const findTwitsById = (twitId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/twits/${twitId}`)
    console.log('findTwitsById : ', data)
    dispatch({ type: FIND_TWEET_BY_ID_SUCCESS, payload: data })
  } catch (error) {
    console.log('catch error - ', error)
    dispatch({ type: FIND_TWEET_BY_ID_FAILURE, payload: error.message })
  }
}

export const createTweet = (tweetData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/twits/create`, tweetData)
    console.log('createTweet : ', data)
    dispatch({ type: TWIT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    console.log('catch error - ', error)
    dispatch({ type: TWIT_CREATE_FAILURE, payload: error.message })
  }
}

export const createTweetReply = (tweetData) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/twits/reply`, tweetData)
    console.log('createTweetReply : ', data)
    dispatch({ type: REPLY_TWEET_SUCCESS, payload: data })
  } catch (error) {
    console.log('catch error - ', error)
    dispatch({ type: REPLY_TWEET_FAILURE, payload: error.message })
  }
}

export const createReTweet = (twitId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/twits/${twitId}/retwit`)
    console.log('createReTweet : ', data)
    dispatch({ type: RETWEET_SUCCESS, payload: data })
  } catch (error) {
    console.log('catch error - ', error)
    dispatch({ type: RETWEET_FAILURE, payload: error.message })
  }
}

export const likeTweet = (twitId) => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/${twitId}/like`)
    console.log('likeTweet : ', data)
    dispatch({ type: LIKE_TWEET_SUCCESS, payload: data })
  } catch (error) {
    console.log('catch error - ', error)
    dispatch({ type: LIKE_TWEET_FAILURE, payload: error.message })
  }
}

export const deleteTweet = (twitId) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/api/twits/${twitId}`)
    console.log('deleteTweet : ', data)
    dispatch({ type: TWIT_DELETE_SUCCESS, payload: twitId })
  } catch (error) {
    console.log('catch error - ', error)
    dispatch({ type: TWIT_DELETE_FAILURE, payload: error.message })
  }
}
