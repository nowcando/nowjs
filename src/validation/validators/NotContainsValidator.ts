
import { StringFormatType } from "../../utils/index";
import { ValidationContext, VALIDATOR_METADATA_KEY, ValidatorBase, ValidatorException } from "../index";

export const VALIDATOR_NOTCONTAINS_METADATA_KEY = Symbol("validation:validator:isNotContains");

export function isNotContains(value: string, errorMessage?: StringFormatType) {
    // tslint:disable-next-line:ban-types
    return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        const original = descriptor.value;
        Reflect.defineMetadata(VALIDATOR_NOTCONTAINS_METADATA_KEY, null, target, propertyKey);
        // tslint:disable-next-line:max-line-length
        Reflect.defineMetadata(VALIDATOR_METADATA_KEY,
             new NotContainsValidator(value, errorMessage), target, propertyKey);
    };
}

export class NotContainsValidator extends ValidatorBase {

    constructor(private value: string,
                errorMessage: StringFormatType = "The value of ${DisplayName} must greater than min: ${Min} .") {
        super("NotContains", errorMessage);
    }

    public get Value(): string {
        return this.value;
    }

    public validate(context: ValidationContext<any, any>): Promise<boolean> {
        if ((context.Value === undefined || context.Value === null)) {
            return Promise.resolve(true);
        }

        if ( (context.Value.search(this.value) > 0)) {

            return Promise.reject(new ValidatorException(this.Name,
                context.Target,
                context.PropertyName,
                this.formatErrorMessage(context)));
        }
        return Promise.resolve(true);
    }

}
