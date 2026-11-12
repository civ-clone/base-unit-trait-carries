"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carries = void 0;
const UnitTrait_1 = require("@civ-clone/core-unit/UnitTrait");
const traits_1 = require("@civ-clone/core-unit/traits");
/**
 * A transport carries units of a domain class (`new Carries(Land)`), or with a trait (`new Carries(SingleUse)`). A type
 *  may have more than one. How many it holds is the `Capacity` yield.
 */
class Carries extends UnitTrait_1.UnitTrait {
    constructor(what) {
        super();
        this.what = what;
    }
    /** `Carries/Land`, so a type can be declared to carry more than one thing. */
    key() {
        return `${super.key()}/${this.what.name}`;
    }
    carries(unit, ruleRegistry) {
        const what = this.what;
        if (!(0, UnitTrait_1.isTraitType)(what)) {
            return (0, traits_1.isA)(unit, what);
        }
        if (ruleRegistry !== undefined) {
            return (0, traits_1.hasTrait)(unit, what, ruleRegistry);
        }
        if (typeof unit === 'function') {
            throw new TypeError('Carries: a unit class has no registry of its own, so asking whether it has a trait needs one.');
        }
        return unit.hasTrait(what);
    }
}
exports.Carries = Carries;
exports.default = Carries;
//# sourceMappingURL=Carries.js.map