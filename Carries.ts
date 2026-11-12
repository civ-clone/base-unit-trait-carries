import {
  TraitType,
  UnitTrait,
  isTraitType,
} from '@civ-clone/core-unit/UnitTrait';
import { hasTrait, isA } from '@civ-clone/core-unit/traits';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Unit from '@civ-clone/core-unit/Unit';

/**
 * A transport carries units of a domain class (`new Carries(Land)`), or with a trait (`new Carries(SingleUse)`). A type
 *  may have more than one. How many it holds is the `Capacity` yield.
 */
export class Carries extends UnitTrait {
  readonly what: typeof Unit | TraitType;

  constructor(what: typeof Unit | TraitType) {
    super();

    this.what = what;
  }

  /** `Carries/Land`, so a type can be declared to carry more than one thing. */
  key(): string {
    return `${super.key()}/${this.what.name}`;
  }

  /**
   * Whether `unit` is something this carries. A unit's traits come from its own registry; a class's from
   *  `ruleRegistry`, which a class needs when `what` is a trait.
   */
  carries(unit: Unit): boolean;
  carries(unit: Unit | typeof Unit, ruleRegistry: RuleRegistry): boolean;
  carries(unit: Unit | typeof Unit, ruleRegistry?: RuleRegistry): boolean {
    const what = this.what;

    if (!isTraitType(what)) {
      return isA(unit, what as typeof Unit);
    }

    if (ruleRegistry !== undefined) {
      return hasTrait(unit, what, ruleRegistry);
    }

    if (typeof unit === 'function') {
      throw new TypeError(
        'Carries: a unit class has no registry of its own, so asking whether it has a trait needs one.'
      );
    }

    return unit.hasTrait(what);
  }
}

export default Carries;
