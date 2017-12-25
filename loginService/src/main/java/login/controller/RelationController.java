package login.controller;

import login.dao.IRelationDAO;
import login.model.Relation;
import login.model.RelationStatus;
import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class RelationController {

    @Autowired
    private IRelationDAO relationDao;

    @RequestMapping(value = "/relations", produces="application/json")
    @ResponseBody
    public Iterable<Relation> getAllRelations(){
        return relationDao.findAll();
    }

    @RequestMapping(value = "/relation", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Iterable<Relation>> getUserRelations(@RequestBody User user){
        try{
            return new ResponseEntity<>(relationDao.findByUser(user), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/relation/invite", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<String> Invite(@RequestBody User user1, @RequestBody User user2){
        try{
            Relation relation = relationDao.findByUsers(user1,user2);
            if(relation != null){
                relationDao.save(new Relation(user1, user2, RelationStatus.SENT, RelationStatus.PENDING));
                return new ResponseEntity<>("User invited!", HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>("User already invited!", HttpStatus.CONFLICT);
            }
        }
        catch(Exception e){
            return new ResponseEntity<>(new String() ,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/relation/accept", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> Accept(@RequestBody Relation relation){
        try{
            relation.setStatus1(RelationStatus.FRIENDS);
            relation.setStatus2(RelationStatus.FRIENDS);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/relation/reject", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> Reject(@RequestBody Relation relation){
        try{
            relation.setStatus1(RelationStatus.SENT);
            relation.setStatus2(RelationStatus.REJECTED);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
