package com.hyojin.backx.service;

import com.hyojin.backx.domain.Twit;
import com.hyojin.backx.domain.User;
import com.hyojin.backx.exception.TwitException;
import com.hyojin.backx.exception.UserException;
import com.hyojin.backx.request.TwitReplyRequest;

import java.util.List;

public interface TwitService {

    Twit createTwit(Twit req, User user) throws UserException;

    List<Twit> findAllTwit();

    Twit retwit(Long twitId, User user) throws UserException, TwitException;

    Twit findById(Long twitId) throws TwitException;

    void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException;

    Twit removeFromRetwit(Long twitId, User user) throws TwitException, UserException;

    Twit createdReply(TwitReplyRequest req, User user) throws TwitException;

    List<Twit> getUserTwit(User user);

    List<Twit> findByLikesContainsUser(User user);

}
