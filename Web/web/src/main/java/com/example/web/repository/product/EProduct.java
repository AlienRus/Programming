package com.example.web.repository.product;

import java.io.Serializable;
import jakarta.persistence.*;

import pack.model.dto.Product;

@Entity
@Table(name = "\"products\"")
public class EProduct  implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "\"id\"")
    private int id;

    @Column(name = "\"ProductName\"")
    private String name;

    @Column(name = "\"Price\"")
    private int price;

    @Column(name = "\"Description\"")
    private String description;

    @Column(imageId = "\"ImageId\"")
    private int imageId;

    protected EProduct() {}

    public EProduct(String name, int price, String description, int imageId) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageId = imageId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getImageId() {
        return imageId;
    }

    public void setImage(int imageId) {
        this.imageId = imageId;
    }

    public Product convert() {
        Product product = new Product();

        product.setId(this.getId());
        product.setName(this.getName());
        product.setPrice(this.getPrice());
        product.setDescription(this.getDescription());
        product.setImage(this.getImageId());

        return product;
    }
}