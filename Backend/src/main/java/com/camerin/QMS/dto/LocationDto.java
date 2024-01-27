package com.camerin.QMS.dto;

import com.camerin.QMS.entity.ServiceMaster;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LocationDto {

    private Long id;
    private String locationName;
    private String description;
    private Integer userNo;
    private Long serviceId;
    private Date createdDatetime;
    private Long createdBy;
    private Long queNumber;
    private Long updatedBy;
    private Date updatedDatetime;
    private int versionNo;
    private Boolean isActive;
}
