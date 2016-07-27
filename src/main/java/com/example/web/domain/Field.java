package com.example.web.domain;

public class Field {
    private String name;
    private String title;
    private String mask;

    public Field(String name, String title, String mask) {
        this.name = name;
        this.title = title;
        this.mask = mask;
    }

    public Field() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMask() {
        return mask;
    }

    public void setMask(String mask) {
        this.mask = mask;
    }

    @Override
    public String toString() {
        return "Field{" +
                "name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", mask='" + mask + '\'' +
                '}';
    }
}
