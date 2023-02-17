package com.vc.content.domain;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Transient;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Content {

    @Transient
    public static final String SEQUENCE_NAME = "user_sequence";

    @Id
    private long cid;
    private String title;
    private String description;
    private Date time;
}
