package com.camerin.QMS.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

@MappedSuperclass
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaseDomain implements Serializable {

    private static final long serialVersionUID = 1L;
    private final int CREATEDBY_LENGTH = 100;

    @Column(name="CREATEDBY", length=CREATEDBY_LENGTH, nullable=false)
    private Long createdBy;

    @Column(name="CREATEDDATETIME", nullable=false)
    @OrderBy(value="desc")
    private Date createdDatetime;

    @Column(name="UPDATEDBY", length=CREATEDBY_LENGTH)
    private Long updatedBy;

    @Column(name="UPDATEDDATETIME")
    private Date updatedDatetime;

    @Column(name="HIBVERSION")
    @Version
    private int versionNo;

    @Column(name="INTRABRANCHID")
    private Long intrabranchid;

    @Column(name = "ISACTIVE")
    private Boolean isActive;

    @Transient
    private Boolean fromEd = Boolean.FALSE;

    public BaseDomain(Long createdBy, Date createdDatetime) {
        this.createdBy = createdBy;
        this.createdDatetime = createdDatetime == null ? null : new Timestamp(
                createdDatetime.getTime());
    }

    public BaseDomain(Long createdBy, Date createdDatetime,int versionNo) {
        this.createdBy = createdBy;
        this.createdDatetime = createdDatetime == null ? null : new Timestamp(
                createdDatetime.getTime());
        this.versionNo = versionNo;
    }

    public BaseDomain(Long createdBy, Date createdDatetime, Long updatedBy,
                      Date updatedDatetime) {
        this.createdBy = createdBy;
        this.createdDatetime = createdDatetime == null ? null : new Timestamp(
                createdDatetime.getTime());
        this.updatedBy = updatedBy;
        this.updatedDatetime = updatedDatetime == null ? null : new Timestamp(
                updatedDatetime.getTime());
    }

}
