package com.hyojin.backx.service.impl;

import com.hyojin.backx.domain.Like;
import com.hyojin.backx.domain.Twit;
import com.hyojin.backx.domain.User;
import com.hyojin.backx.exception.TwitException;
import com.hyojin.backx.exception.UserException;
import com.hyojin.backx.repository.LikeRepository;
import com.hyojin.backx.repository.TwitRepository;
import com.hyojin.backx.service.LikeService;
import com.hyojin.backx.service.TwitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private TwitService twitService;

    @Autowired
    private TwitRepository twitRepository;

    @Override
    public Like likeTwit(Long twitId, User user) throws UserException, TwitException {
        Like isLikeExist = likeRepository.isLikeExist(user.getId(), twitId);

        if (isLikeExist != null) {
            likeRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }

        Twit twit = twitService.findById(twitId);
        Like like = new Like();
        like.setTwit(twit);
        like.setUser(user);

        Like savedLike = likeRepository.save(like);
        twit.getLikes().add(savedLike);
        twitRepository.save(twit);

        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long twitId) throws TwitException {

        Twit twit = twitService.findById(twitId);
        List<Like> likes = likeRepository.findByTwitId(twitId);

        return likes;
    }
}
