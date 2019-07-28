package hs.selmi.booki.domain;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity(name = "utiliLivreDone")
@Table(name = "utiliLivreDone")
public class UtiliLivreDone {

	public UtiliLivreDone() {
		// TODO Auto-generated constructor stub
	}
	
	@EmbeddedId
    private UtiliLivreDoneID id;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("isbn")
    private Livre livreDone;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("id")
    private Utilisateur userDone;
 
    @Column(name = "note")
    private int rate ;
 
 
    
    
    public UtiliLivreDone(Livre livre, Utilisateur user, int rate) {
		super();
		this.id = new UtiliLivreDoneID(livre.getIsbn(), user.getId());
		this.livreDone = livre;
		this.userDone = user;
		this.rate =rate;
	}



	public UtiliLivreDoneID getId() {
		return id;
	}



	public void setId(UtiliLivreDoneID id) {
		this.id = id;
	}



	public Livre getLivre() {
		return livreDone;
	}



	public void setLivre(Livre livre) {
		this.livreDone = livre;
	}



	public Utilisateur getUser() {
		return userDone;
	}



	public void setUser(Utilisateur user) {
		this.userDone = user;
	}



	public int getRate() {
		return rate;
	}



	public void setRate(int rate) {
		this.rate = rate;
	}



	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass()) 
            return false;
 
        UtiliLivreDone that = (UtiliLivreDone) o;
        return Objects.equals(userDone, that.userDone) && 
               Objects.equals(livreDone, that.livreDone);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(userDone, livreDone);
    }

	
	
}
