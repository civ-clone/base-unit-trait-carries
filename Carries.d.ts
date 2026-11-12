import { TraitType, UnitTrait } from '@civ-clone/core-unit/UnitTrait';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Unit from '@civ-clone/core-unit/Unit';
/**
 * A transport carries units of a domain class (`new Carries(Land)`), or with a trait (`new Carries(SingleUse)`). A type
 *  may have more than one. How many it holds is the `Capacity` yield.
 */
export declare class Carries extends UnitTrait {
  readonly what: typeof Unit | TraitType;
  constructor(what: typeof Unit | TraitType);
  /** `Carries/Land`, so a type can be declared to carry more than one thing. */
  key(): string;
  /**
   * Whether `unit` is something this carries. A unit's traits come from its own registry; a class's from
   *  `ruleRegistry`, which a class needs when `what` is a trait.
   */
  carries(unit: Unit): boolean;
  carries(unit: Unit | typeof Unit, ruleRegistry: RuleRegistry): boolean;
}
export default Carries;
