package com.hyojin.backx.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Twit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    private String content;

    @OneToMany(mappedBy = "twit", cascade = CascadeType.ALL)
    private List<Like> likes = new ArrayList<>();

    @ManyToMany
    private List<Twit> replyTwits = new ArrayList<>();

    @ManyToMany
    private List<User> retwitUser = new ArrayList<>();

    @ManyToOne
    private Twit replyFor;

    private boolean isReply;
    private boolean isTwit;

    @Lob
    private String video; // 비디오 URL 또는 파일 경로

    private String image;

    private LocalDateTime createdAt;
//    private LocalDateTime CreatedAt;
}
