package com.example.web.domain;

import java.util.Collection;

public class Provider {
    private long id;
    private String name;
    private double commission;
    private Collection<Field> fields;

    public Provider(long id, String name, double commission, Collection<Field> fields) {
        this.id = id;
        this.name = name;
        this.commission = commission;
        this.fields = fields;
    }

    public Provider() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCommission() {
        return commission;
    }

    public void setCommission(double commission) {
        this.commission = commission;
    }

    public Collection<Field> getFields() {
        return fields;
    }

    public void setFields(Collection<Field> fields) {
        this.fields = fields;
    }

    @Override
    public String toString() {
        return "Provider{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", commission=" + commission +
                ", fields=" + fields +
                '}';
    }
}
