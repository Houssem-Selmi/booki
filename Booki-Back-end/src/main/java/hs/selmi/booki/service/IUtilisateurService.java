package hs.selmi.booki.service;

import java.util.List;
import java.util.Optional;

import hs.selmi.booki.domain.Livre;
import hs.selmi.booki.domain.Utilisateur;

public interface IUtilisateurService {
	
	List<Utilisateur> getAllusers();
	boolean saveUser(Utilisateur utilisateur);
	boolean deleteUser(Utilisateur utilisateur);
	Optional<List<Utilisateur>> findByUsername(String username);
	Optional<Utilisateur> findByEmail(String email);
	Optional<Utilisateur>  findById(int id);
	boolean addBookToUser(Livre livre,Utilisateur utilisateur);
	boolean userHasBook(String isbn, String email);

	List<Livre> getUserBooks(String email);

	boolean removeBookFromUser(Livre livre, Utilisateur utilisateur);
	boolean updateUsername(String email, String username);
	boolean updatePassword(String email, String oldPass, String newPAss);
	boolean updateImageName(String email, String imgName);

	Utilisateur findByEmailAndPassword(String email,String password);
	int getNubmerBookDoneOfUser(String email);
	String signin(String email, String password);
	String signup(Utilisateur user);
	String getUserImage(String email);

}
