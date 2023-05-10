package project.controller.paths;

import java.util.List;

import jakarta.inject.Inject;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import project.builder.Build;
import project.controller.interceptor.IdRequired;
import project.model.dto.Order;
import project.model.interfaces.in.IModelOrder;

@Path("/orders")
public class OrderPaths {

    @Inject
    @Build
    private IModelOrder modelOrder;

    private Jsonb jsonb = JsonbBuilder.create();

    @GET
    @IdRequired
    @Path("/")
    public Response getOrders(@Context ContainerRequestContext requestContext, String orderJson) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        try {
            List<Order> orders = modelOrder.getAllOrders();
            String result = jsonb.toJson(orders);
            return Response.ok(result).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
    }

    @POST
    @IdRequired
    @Path("/status")
    public Response changeStatus(@Context ContainerRequestContext requestContext, String orderJson) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        try {
            Order order = jsonb.fromJson(orderJson, Order.class);
            if (modelOrder.changeStatusOrder(order)) {
                return Response.status(Response.Status.OK).build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
    }
}
