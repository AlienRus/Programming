package com.example.web.model.interfaces.user;

import java.util.ArrayList;

import pack.model.dto.User;

public interface IUserModel {
    void injectRepository(IUserRepository repository);
    Boolean checkUser(User user) throws Exception;
    Boolean addUser(User user) throws Exception;
}