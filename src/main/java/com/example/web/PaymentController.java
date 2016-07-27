package com.example.web;

import com.example.web.domain.Field;
import com.example.web.domain.Provider;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequestMapping(value="/api/payment", method= RequestMethod.GET, produces="application/json")
public class PaymentController {

    private final Collection<Provider> providers;

    public PaymentController() {
       this.providers = Collections.unmodifiableCollection(
               Arrays.asList(
                       new Provider(1L, "Beeline", 0.01, Collections.unmodifiableCollection(
                               Arrays.asList(
                                       new Field("account", "tel number", "\\d{10}"),
                                       new Field("amount", "amount", "\\d+\\.\\d{2}"),
                                       new Field("comment", "comment", "\\w*" )
                               )
                       )),
                       new Provider(2L, "WebMoney", 0.02, Collections.unmodifiableList(
                               Arrays.asList(
                                       new Field("account", "Ruble account", "R\\d{10}"),
                                       new Field("amount", "amount", "\\d+\\.\\d{2}"),
                                       new Field("comment", "comment", "\\w*" )
                               )
                       ))
               )
       );
    }

    @ResponseBody
    @RequestMapping(value="/providers")
    public Collection<Provider> helloWorld() {
        return this.providers;
    }
}
