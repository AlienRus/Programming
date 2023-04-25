package project.model.interfaces.out;

import java.util.List;

import project.model.dto.User;

public interface IRepositoryUser {
    public User findByLogin(String login);

    public User findById(Integer id);

    public boolean addUser(User user);

    public List<User> findAll();

    public boolean deleteById(Integer userId);

    public boolean setUserRole(Integer id, String role);
}
