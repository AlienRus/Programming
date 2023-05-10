package project.controller.paths;

import java.security.Key;
import java.util.ArrayList;
import java.util.List;

import jakarta.inject.Inject;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import project.builder.Build;
import project.controller.interceptor.IdRequired;
import project.controller.token.Token;
import project.controller.token.TokenIssuer;
import project.controller.token.TokenKey;
import project.model.dto.Order;
import project.model.dto.User;
import project.model.interfaces.in.IModelOrder;
import project.model.interfaces.in.IModelUser;
import project.model.interfaces.in.IModelUserWs2;

@Path("/users")
public class UserPaths {
    @Inject
    @Build
    private IModelUser modelUser;

    @Inject
    @Build
    private IModelOrder modelOrder;

    @Inject
    private IModelUserWs2 modelUsersWs;

    private Jsonb jsonb = JsonbBuilder.create();

    @POST
    @Path("/auth")
    public Response auth(@Context ContainerRequestContext requestContext, String userJson) {
        try {
            User user = jsonb.fromJson(userJson, User.class);
            if (!modelUser.authUser(user)) {
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
            User userFound = modelUser.getUser(user.getLogin());
            TokenKey tokenKey = TokenKey.getInstance();
            Key key = tokenKey.getKey();
            TokenIssuer ti = new TokenIssuer(key);
            String jwt = ti.issueToken(userFound.getLogin(), userFound.getRole());
            Token token = new Token(jwt);
            return Response.ok(jsonb.toJson(token)).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
    }

    @POST
    @Path("/reg")
    public Response reg(@Context ContainerRequestContext requestContext, String userJson) {
        try {
            User user = jsonb.fromJson(userJson, User.class);
            if (modelUser.regUser(user)) {
                modelUsersWs.sendAll();
                return Response.status(Response.Status.OK).build();
            } else {
                return Response.status(Response.Status.CONFLICT).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
    }

    @GET
    @IdRequired
    @Path("/")
    public Response getUsers(@Context ContainerRequestContext requestContext) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        List<User> users = modelUser.getAllUsers();
        String result = jsonb.toJson(users);
        return Response.ok(result).build();
    }

    @POST
    @IdRequired
    @Path("/status")
    public Response changeRole(@Context ContainerRequestContext requestContext, String userJson) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        try {
            User user = jsonb.fromJson(userJson, User.class);
            modelUser.setUserRole(user);
            modelUsersWs.sendAll();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
        return Response.status(Response.Status.OK).build();
    }

    @DELETE
    @IdRequired
    @Path("/")
    public Response deleteUsers(@Context ContainerRequestContext requestContext) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        String listId = requestContext.getProperty("data").toString();
        try {
            List<User> users = jsonb.fromJson(listId, new ArrayList<User>() {
            }.getClass().getGenericSuperclass());
            modelUser.deleteUser(users);
            modelUsersWs.sendAll();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
        return Response.status(Response.Status.OK).build();
    }

    @GET
    @IdRequired
    @Path("/orders")
    public Response getOrders(@Context ContainerRequestContext requestContext) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        try {
            List<Order> orders = modelOrder.getUserOrders(login);
            String result = jsonb.toJson(orders);
            return Response.ok(result).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
    }

    @POST
    @IdRequired
    @Path("/orders")
    public Response addOrder(@Context ContainerRequestContext requestContext, String orderJson) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        try {
            Order order = jsonb.fromJson(orderJson, Order.class);
            if (modelOrder.addOrder(login, order)){
                return Response.status(Response.Status.OK).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
    }

    




}
