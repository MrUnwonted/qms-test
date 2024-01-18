package com.camerin.QMS.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "SERVICEMASTER")
public class ServiceMaster extends BaseDomain{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SERVICEID")
    private Long id;

    @Column(name = "SERVICENAME")
    private String serviceName;

    @Column(name = "DESCRIPTION")
    private String description;

}
