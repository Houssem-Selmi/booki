package hs.selmi.booki.service;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hs.selmi.booki.domain.Role;
import hs.selmi.booki.domain.Utilisateur;
import hs.selmi.booki.exception.CustomException;
import hs.selmi.booki.repository.IUtilisateursRepository;
import hs.selmi.booki.security.JwtTokenProvider;

@Service
public class UserService {

	
	  @Autowired
	  private IUtilisateursRepository userRepository;

	  @Autowired
	  private PasswordEncoder passwordEncoder;

	  @Autowired
	  private JwtTokenProvider jwtTokenProvider;

	  @Autowired
	  private AuthenticationManager authenticationManager;

	  public String signin(String email, String password) {
	    try {
	      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
	      return jwtTokenProvider.createToken(email, userRepository.findByEmail(email).get().getRoles());
	    } catch (AuthenticationException e) {
	      throw new CustomException("Invalid username/password supplied",HttpStatus.UNPROCESSABLE_ENTITY);
	    }
	  }

	  public String signup(Utilisateur user) {
	    if (!userRepository.existsByEmail(user.getEmail())) {
	      user.setPassword(passwordEncoder.encode(user.getPassword()));
	      user.setRoles(new ArrayList<Role>(Arrays.asList(Role.ROLE_CLIENT)));

	      userRepository.save(user);
	      return jwtTokenProvider.createToken(user.getEmail(), user.getRoles());
	    } else {
	      throw new CustomException("email is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
	    }
	  }
	
	
}
