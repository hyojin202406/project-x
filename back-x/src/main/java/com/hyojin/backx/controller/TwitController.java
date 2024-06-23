package com.hyojin.backx.controller;

import com.hyojin.backx.service.TwitService;
import com.hyojin.backx.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/twits")
public class TwitController {

    private TwitService twitService;

    private UserService userService;



}
