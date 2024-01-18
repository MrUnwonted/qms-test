package com.camerin.QMS.repository;

import com.camerin.QMS.entity.CounterMaster;
import com.camerin.QMS.entity.ServiceMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CounterMasterRepository extends JpaRepository<CounterMaster, Long> {
}
