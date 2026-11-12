# base-unit-trait-carries

The `Carries` unit trait: a unit type with it carries other units.

A transport with this trait carries units of a domain class (`new Carries(Land)`) or with a trait (`new Carries(SingleUse)`). A type may have several (`new Carries(Air)` and `new Carries(Land)`). Its `carries(unit)` answers whether a unit, or a unit class, is one it carries. How many it holds is the `Capacity` yield, not this trait.

For example: Civ1: Trireme, Sail, Frigate and Transport carry `Land`; Carrier carries `Air`. Civ2: flag 7 (Carrier) carries `Air`; Submarine carries missiles.

A game declares which of its unit classes have the trait with `UnitTraits` rules from `@civ-clone/core-unit`, and its
rules ask `unit.hasTrait(Carries)`:

```ts
import Carries from '@civ-clone/base-unit-trait-carries/Carries';
import { unitTraits } from '@civ-clone/core-unit/Rules/UnitTraits';

ruleRegistry.register(...unitTraits('civ1-unit:unit/trait', Carrier, new Carries(Air)));
```

A rule that needs its parameters reads the traits themselves: `unit.traits(Carries)` for a unit, or
`traitsOf(UnitClass, Carries, ruleRegistry)` (from `@civ-clone/core-unit/traits`) for a class. A type may be declared
with more than one:

```ts
unit.traits(Carries).some((trait: Carries): boolean => trait.carries(cargo));
```

Part of the unit traits design (civ-clone/web-renderer#1008).
