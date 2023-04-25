package project.database.repos;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import jakarta.annotation.Resource;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import jakarta.transaction.UserTransaction;
import project.database.entities.EUser;
import project.model.dto.User;
import project.model.interfaces.out.IRepositoryUser;

public class UserRepository implements IRepositoryUser {

    @PersistenceUnit(unitName = "shopProject_PersistenceUnit")
    private EntityManagerFactory entityManagerFactory;

    private EntityManager entityManager;

    @Resource
    UserTransaction userTransaction;

    @Override
    public User findByLogin(String login) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "select u from EUser u where u.login=:login";
        User user = null;
        try {
            EUser eUser = entityManager.createQuery(query, EUser.class).setParameter("login", login).getSingleResult();
            user = new User();
            user.setId(eUser.getId());
            user.setLogin(eUser.getLogin());
            user.setPassword(eUser.getPassword());
            user.setRole(eUser.getRole());
        } catch (Exception e) {
        } finally {
            entityManager.close();
        }
        return user;
    }

    @Override
    public boolean addUser(User user) {
        entityManager = entityManagerFactory.createEntityManager();
        boolean status = true;
        Logger.getLogger(UserRepository.class.getName()).info(user.getLogin());
        try {
            EUser eUser = new EUser();
            eUser.setLogin(user.getLogin());
            eUser.setPassword(user.getPassword());
            eUser.setRole("user");
            userTransaction.begin();
            entityManager.joinTransaction();
            entityManager.persist(eUser);
            userTransaction.commit();
        } catch (Exception e) {
            status = false;
        } finally {
            entityManager.close();
        }
        return status;
    }

    @Override
    public List<User> findAll() {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "select u from EUser u";
        List<User> users = new ArrayList<>();
        try {
            List<EUser> eUsers = entityManager.createQuery(query, EUser.class).getResultList();
            for (EUser eUser : eUsers) {
                User user = new User();
                user.setId(eUser.getId());
                user.setLogin(eUser.getLogin());
                user.setPassword(eUser.getPassword());
                user.setRole(eUser.getRole());
                users.add(user);
            }
        } catch (Exception e) {
        } finally {
            entityManager.close();
        }
        return users;
    }

    @Override
    public boolean deleteById(Integer userId) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "delete from EUser u where u.id=:id";
        boolean status = true;
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            entityManager.createQuery(query, EUser.class).setParameter("id", userId).executeUpdate();
            userTransaction.commit();
        } catch (Exception e) {
            status = false;
        }
        return status;
    }

    @Override
    public boolean setUserRole(Integer id, String role) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "update EUser u set u.role=:role where u.id=:id";
        boolean status = true;
        try {
            userTransaction.begin();
            entityManager.joinTransaction();
            entityManager.createQuery(query, EUser.class).setParameter("role", role)
                    .setParameter("id", id).executeUpdate();
            userTransaction.commit();
        } catch (Exception e) {
            status = false;
        }
        return status;
    }

    @Override
    public User findById(Integer id) {
        entityManager = entityManagerFactory.createEntityManager();
        String query = "select u from EUser u where u.id=:id";
        User user = null;
        try {
            EUser eUser = entityManager.createQuery(query, EUser.class).setParameter("id", id).getSingleResult();
            user = new User();
            user.setId(eUser.getId());
            user.setLogin(eUser.getLogin());
            user.setPassword(eUser.getPassword());
            user.setRole(eUser.getRole());
        } catch (Exception e) {
        } finally {
            entityManager.close();
        }
        return user;
    }

}
