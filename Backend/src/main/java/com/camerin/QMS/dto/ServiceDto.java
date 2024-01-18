package com.camerin.QMS.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDto {
    private Long id;
    private String serviceName;
    private String description;
    private Date createdDatetime;
    private Long createdBy;
    private Long updatedBy;
    private Date updatedDatetime;
    private int versionNo;
    private Boolean isActive;

}
