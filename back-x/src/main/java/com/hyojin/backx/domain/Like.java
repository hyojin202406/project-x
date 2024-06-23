package com.hyojin.backx.domain;

import jakarta.persistence.*;
import lombok.Data;
@Table(name = "likes")
@Data
@Entity
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Twit twit;

}
