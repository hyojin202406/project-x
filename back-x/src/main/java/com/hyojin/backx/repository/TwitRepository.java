package com.hyojin.backx.repository;

import com.hyojin.backx.domain.Twit;
import com.hyojin.backx.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TwitRepository extends JpaRepository<Twit, Long> {


    List<Twit> findAllByIsTwitTrueOrderByCreatedAtDesc();

    List<Twit> findByRetwitUserContainsOrUser_IdAndIsTwitTrueOrderByCreatedAtDesc(User user, Long userId);

    List<Twit> findByLikesContainingOrderByCreatedAtDesc(User user);

    @Query("SELECT t FROM Twit t JOIN t.likes l where l.user.id =:userId")
    List<Twit> findByLikesUser_id(Long userId);
}
