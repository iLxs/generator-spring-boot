package com.ey.pc.pe.variable;

import com.ey.pc.pe.shared.annotations.EnablePointSwagger;
import com.ey.pc.pe.shared.annotations.PointApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@PointApplication
@EnablePointSwagger
@EnableFeignClients("<%= packageName %>.proxy")
public class <%= appNameForCode %>Application {

	public static void main(String[] args) {
		SpringApplication.run(<%= appNameForCode %>Application.class, args);
	}
}
