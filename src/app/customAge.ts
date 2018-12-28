import { Directive } from "@angular/core";
import { NG_VALIDATORS, Validator, FormControl } from "@angular/forms";


@Directive({
    selector:'[max-word-count]',
    providers:[{
        provide:NG_VALIDATORS,
        useExisting:MaxCountValidar,
        multi:true
    }]
})

export class MaxCountValidar implements Validator {
    validate((c:FormControl)    )
}