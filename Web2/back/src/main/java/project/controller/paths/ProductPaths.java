package project.controller.paths;

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
import project.model.dto.Product;
import project.model.interfaces.in.IModelProduct;
import project.model.interfaces.in.IModelProductWs2;

@Path("/products")
public class ProductPaths {

    @Inject
    @Build
    private IModelProduct modelProduct;

    @Inject
    private IModelProductWs2 modelProductWs;

    private Jsonb jsonb = JsonbBuilder.create();

    @GET
    @IdRequired
    @Path("/")
    public Response getProducts(@Context ContainerRequestContext requestContext) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        try {
            List<Product> products = modelProduct.getAllProducts();
            String result = jsonb.toJson(products);
            return Response.ok(result).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
    }

    @POST
    @IdRequired
    @Path("/")
    public Response saleProduct(@Context ContainerRequestContext requestContext, String jsonProduct) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        try {
            Product product = jsonb.fromJson(jsonProduct, Product.class);
            modelProduct.addProduct(product);
            modelProductWs.sendAll();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
        return Response.status(Response.Status.OK).build();
    }

    @DELETE
    @IdRequired
    @Path("/")
    public Response deleteProducts(@Context ContainerRequestContext requestContext, String jsonProduct) {
        String login = requestContext.getProperty("login").toString();
        if (login.equals("Error")) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        String listId = requestContext.getProperty("data").toString();
        try {
            List<Product> products = jsonb.fromJson(listId, new ArrayList<Product>() {
            }.getClass().getGenericSuperclass());
            modelProduct.deleteProduct(products);
            modelProductWs.sendAll();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
        return Response.status(Response.Status.OK).build();
    }
}
