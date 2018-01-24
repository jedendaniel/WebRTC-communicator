package login.controller;

import login.model.Relation;
import login.model.RelationStatus;
import login.model.User;
import login.service.IRelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RelationController {

    @Autowired
    private IRelationService relationService;

    @RequestMapping(value = "/relations", method = RequestMethod.GET, produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<List<Relation>> getAllUserRelations(@RequestBody User user) {
        return new ResponseEntity<List<Relation>>(relationService.getAllUserRelations(user), HttpStatus.OK);
    }

    @RequestMapping(value = "/relations/{status}", method = RequestMethod.GET, produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<List<Relation>> getUserRelationsByStatus(@RequestBody User user, @RequestParam("status") RelationStatus relationStatus){
        return new ResponseEntity<List<Relation>>(relationService.getUserRelationsByStatus(user, relationStatus), HttpStatus.OK);
    }

    @RequestMapping(value = "/relation", method = RequestMethod.GET, produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Relation> getRelation(@RequestBody Relation relation){
        return new ResponseEntity<Relation>(relationService.getRelation(relation), HttpStatus.OK);
    }

    @RequestMapping(value = "/relations", method = RequestMethod.POST, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Void> addRelation(@RequestBody Relation relation){
        if(relationService.addRelation(relation)){
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value = "/relations", method = RequestMethod.PUT, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Void> updateRelation(@RequestBody Relation relation){
        if(relationService.updateRelation(relation)){
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
    }

    @RequestMapping(value = "/relations", method = RequestMethod.DELETE, consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Void> removeRelation(@RequestBody Relation relation){
        if(relationService.deleteRelation(relation)){
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
    }
}
