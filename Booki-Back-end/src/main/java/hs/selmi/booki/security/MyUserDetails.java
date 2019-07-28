package hs.selmi.booki.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import hs.selmi.booki.domain.Utilisateur;
import hs.selmi.booki.repository.IUtilisateursRepository;


@Service
public class MyUserDetails implements UserDetailsService {

  @Autowired
  private IUtilisateursRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    final Utilisateur user = userRepository.findByEmail(email).get();

    if (user == null) {
      throw new UsernameNotFoundException("email '" + email + "' not found");
    }

    return org.springframework.security.core.userdetails.User//
        .withUsername(email)//
        .password(user.getPassword())//
        .authorities(user.getRoles())//
        .accountExpired(false)//
        .accountLocked(false)//
        .credentialsExpired(false)//
        .disabled(false)//
        .build();
  }

}
