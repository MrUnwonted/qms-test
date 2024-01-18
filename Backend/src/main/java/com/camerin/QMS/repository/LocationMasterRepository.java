package com.camerin.QMS.repository;

import com.camerin.QMS.entity.LocationMaster;
import com.camerin.QMS.entity.ServiceMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationMasterRepository extends JpaRepository<LocationMaster, Long> {
    Optional<LocationMaster> findById(Long locationId);
}
