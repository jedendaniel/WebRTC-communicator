package login.controller;

import login.dao.IRelationDAO;
import login.model.Relation;
import login.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            return new ResponseEntity<>(relationDao.findBtUser(user), HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
