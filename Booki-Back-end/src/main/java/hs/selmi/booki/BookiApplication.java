package hs.selmi.booki;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import hs.selmi.booki.service.IStorageService;
import hs.selmi.booki.service.UserService;

@SpringBootApplication
public class BookiApplication {
	
	@Resource
	IStorageService storageService;
	
	@Autowired
	  UserService userService;
	
	public static void main(String[] args) {
		SpringApplication.run(BookiApplication.class, args);
		
	}
	
}
