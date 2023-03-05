package com.example.web.model.user;

import java.util.ArrayList;

import pack.model.dto.User;
import pack.model.interfaces.user.IUserRepository;
import pack.model.interfaces.user.IUserModel;

public class UserModel implements IUserModel {

    IUserRepository repository;

    @Override
    public void injectRepository(IUserRepository repository) {
        this.repository = repository;
    } 

    @Override
    public Boolean checkUser(User user) throws Exception {
        return repository.checkUser(user.getLogin(), user.getPassword());
    }

    @Override
    public Boolean addUser(User user) throws Exception {
        return repository.addUser(user.getLogin(), user.getPassword(), user.getEmail());
    }
}