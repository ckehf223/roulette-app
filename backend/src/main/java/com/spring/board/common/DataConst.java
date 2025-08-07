package com.spring.board.common;

public enum DataConst {
    INSERT("C"), UPDATE("U"), DELETE("D");

    private final String value;

    DataConst(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
