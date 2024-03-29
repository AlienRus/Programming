package project.builder;

import jakarta.enterprise.inject.Default;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;
import project.model.interfaces.in.IModelOrder;
import project.model.interfaces.in.IModelProduct;
import project.model.interfaces.in.IModelUser;
import project.model.interfaces.in.IProductSender;
import project.model.interfaces.in.IUserSender;
import project.model.interfaces.out.IRepositoryOrder;
import project.model.interfaces.out.IRepositoryProduct;
import project.model.interfaces.out.IRepositoryUser;
import project.model.interfaces.out.ISenderProductWs;
import project.model.interfaces.out.ISenderUserWS;

public class Builder {
    @Inject @Default
    private IModelProduct modelProduct;

    @Inject @Default
    private IModelUser modelUser;

    @Inject @Default
    private IModelOrder modelOrder;

    @Inject @Default
    private IRepositoryOrder repositoryOrder;

    @Inject @Default
    private IRepositoryProduct repositoryProduct;

    @Inject @Default
    private IRepositoryUser repositoryUser;

    @Produces @Build
    public IModelProduct buildModelProduct(){
        modelProduct.setRepository(repositoryProduct);
        return modelProduct;
    }

    @Produces @Build
    public IModelUser buildModelUser(){
        modelUser.setRepository(repositoryUser);
        return modelUser;
    }

    @Produces @Build
    public IModelOrder buildIModelOrder(){
        modelOrder.setRepository(repositoryOrder);
        return modelOrder;
    }

    @Inject @Default
    public ISenderProductWs sender;

    @Inject @Default
    public IProductSender productSender;

    @Produces @Build
    public IProductSender builProductSender(){
        productSender.setSender(sender);
        return productSender;
    }

    @Inject @Default
    public IUserSender userSender;

    @Inject @Default
    public ISenderUserWS senderUser;

    @Produces @Build
    public IUserSender builUserSender(){
        userSender.setSender(senderUser);
        return userSender;
    }
}
