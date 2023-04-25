package project.model.interfaces.in;

import java.util.List;

import project.model.dto.User;
import project.model.interfaces.out.IRepositoryUser;

public interface IModelUser {
    public void setRepository(IRepositoryUser repository);

    public boolean authUser(User user);

    public boolean regUser(User user);

    public User getUser(String login);

    public User getUser(Integer id);

    public List<User> getAllUsers();

    public boolean setUserRole(User user);

    public void deleteUser(List<User> usersId);
}
