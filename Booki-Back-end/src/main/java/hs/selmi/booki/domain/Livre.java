package hs.selmi.booki.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Livres")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Livre {
	@Id
	private String isbn;
	private String titre;
	private String description;
	private String auteur;
	private String imageUrl;
	
	@JsonIgnore
	@ManyToMany(mappedBy="livres")
	private List<Utilisateur> utilisateurs = new ArrayList<>();
	
	
	

	public Livre(String isbn, String titre, String description, String auteur, String imageUrl) {
		super();
		this.isbn = isbn;
		this.titre = titre;
		this.description = description;
		this.auteur = auteur;
		this.imageUrl = imageUrl;
	}


	
	 @OneToMany(
		        mappedBy = "livreDone",
		        cascade = CascadeType.ALL,
		        orphanRemoval = true
		    )
			@JsonIgnore
		    private List<UtiliLivreDone> livresUserDone = new ArrayList<>();
	
	
	
}
