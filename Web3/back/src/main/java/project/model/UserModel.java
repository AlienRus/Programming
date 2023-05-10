package project.model;

import java.util.List;

import project.model.dto.User;
import project.model.interfaces.in.IModelUser;
import project.model.interfaces.out.IRepositoryUser;

public class UserModel implements IModelUser {

    private IRepositoryUser repositoryUser;

    @Override
    public void setRepository(IRepositoryUser repository) {
        this.repositoryUser = repository;
    }

    @Override
    public boolean authUser(User user) {
        User foundUser = repositoryUser.findByLogin(user.getLogin());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())){
            return true;
        }
        return false;
    }

    @Override
    public boolean regUser(User user) {
        return repositoryUser.addUser(user);
    }

    @Override
    public User getUser(String login) {
        return repositoryUser.findByLogin(login);
    }

    @Override
    public List<User> getAllUsers() {
        return repositoryUser.findAll();
    }

    @Override
    public boolean setUserRole(User user) {
        User foundUser = repositoryUser.findById(user.getId());
        String role = foundUser.getRole();
        if (role.equals("user")){
            foundUser.setRole("admin");
        } else {
            foundUser.setRole("user");
        }
        return repositoryUser.setUserRole(foundUser.getId(), foundUser.getRole());
    }

    @Override
    public void deleteUser(List<User> usersId) {
        for (User user : usersId) {
            repositoryUser.deleteById(user.getId());
        }
    }

    @Override
    public User getUser(Integer id) {
        return repositoryUser.findById(id);
    }
    
}
