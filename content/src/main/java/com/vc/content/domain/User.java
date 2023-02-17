package com.vc.content.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document

public class User {

    @Id
    private String email;
    private String name;
    private String password;
    private String role;
    private long seq;
    private List<Content> contentList;
}
