package com.hyojin.backx.service;

import com.hyojin.backx.domain.Like;
import com.hyojin.backx.domain.User;
import com.hyojin.backx.exception.TwitException;
import com.hyojin.backx.exception.UserException;

import java.util.List;

public interface LikeService {

    Like likeTwit(Long twitId, User user) throws UserException, TwitException;

    List<Like> getAllLikes(Long twitId) throws TwitException;


}
