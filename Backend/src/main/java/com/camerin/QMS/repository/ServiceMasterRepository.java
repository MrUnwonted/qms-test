package com.camerin.QMS.repository;

import com.camerin.QMS.entity.ServiceMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServiceMasterRepository extends JpaRepository<ServiceMaster, Long> {
    Optional<ServiceMaster> findById(Long serviceId);
}
