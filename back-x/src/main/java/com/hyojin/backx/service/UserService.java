package com.hyojin.backx.service;

import com.hyojin.backx.domain.User;
import com.hyojin.backx.exception.UserException;

import java.util.List;

public interface UserService {

    User findUserById(Long userId) throws UserException;

    User findUserProfileByJwt(String jwt) throws UserException;

    User updateUser(Long userId, User req) throws UserException;

    User followUser(Long userId, User user) throws UserException;

    List<User> searchUser(String query);

}
