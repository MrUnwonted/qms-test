package com.camerin.QMS.dto;

import com.camerin.QMS.entity.ServiceMaster;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LocationDto {

    private Long id;
    private String locationName;
    private String description;
    private Integer userNo;
    private ServiceMaster service;
}
