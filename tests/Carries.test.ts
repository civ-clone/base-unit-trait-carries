import { hasTrait } from '@civ-clone/core-unit/traits';
import Carries from '../Carries';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Unit from '@civ-clone/core-unit/Unit';
import UnitTrait from '@civ-clone/core-unit/UnitTrait';
import { expect } from 'chai';
import { unitTraits } from '@civ-clone/core-unit/Rules/UnitTraits';

class Land extends Unit {}
class Naval extends Unit {}
class Air extends Unit {}
class Warrior extends Land {}
class Fighter extends Air {}
class Missile extends Air {}
class Carrier extends Naval {}
class Submarine extends Naval {}
class SingleUse extends UnitTrait {}

const unit = (UnitType: typeof Unit, ruleRegistry: RuleRegistry): Unit =>
  new UnitType(null, null as any, null as any, ruleRegistry);

describe('Carries', (): void => {
  const ruleRegistry = new RuleRegistry();

  ruleRegistry.register(
    ...unitTraits('test', Carrier, new Carries(Air), new Carries(Land)),
    ...unitTraits('test', Submarine, new Carries(SingleUse)),
    ...unitTraits('test', Missile, SingleUse)
  );

  it('should have its own rule id for each thing a type carries', (): void => {
    expect(new Carries(Land).key()).to.equal('Carries/Land');
    expect(new Carries(SingleUse).key()).to.equal('Carries/SingleUse');
    expect(hasTrait(Carrier, Carries, ruleRegistry)).to.be.true;
  });

  it('should carry a domain, for classes and units', (): void => {
    const air = new Carries(Air);

    expect(air.carries(Fighter, ruleRegistry)).to.be.true;
    expect(air.carries(Warrior, ruleRegistry)).to.be.false;
    expect(air.carries(unit(Fighter, ruleRegistry))).to.be.true;
    expect(air.carries(unit(Warrior, ruleRegistry))).to.be.false;
  });

  it("should carry a trait, from the unit's registry or the one given", (): void => {
    const missiles = new Carries(SingleUse);

    expect(missiles.carries(Missile, ruleRegistry)).to.be.true;
    expect(missiles.carries(Fighter, ruleRegistry)).to.be.false;
    expect(missiles.carries(unit(Missile, ruleRegistry))).to.be.true;
    expect(missiles.carries(unit(Missile, new RuleRegistry()))).to.be.false;
    expect((): boolean => missiles.carries(Missile as any)).to.throw(TypeError);
  });
});
