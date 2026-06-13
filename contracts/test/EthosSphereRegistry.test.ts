import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('EthosSphereRegistry', () => {
  async function deploy() {
    const [owner, updater, attacker, user] = await ethers.getSigners();
    const Registry = await ethers.getContractFactory('EthosSphereRegistry');
    const registry = await Registry.deploy();
    await registry.waitForDeployment();
    return { registry, owner, updater, attacker, user };
  }

  it('authorizes the deployer as owner and updater', async () => {
    const { registry, owner } = await deploy();
    expect(await registry.owner()).to.equal(owner.address);
    expect(await registry.isAuthorized(owner.address)).to.equal(true);
  });

  it('lets an authorized account update a score', async () => {
    const { registry, owner, user } = await deploy();
    await expect(registry.connect(owner).updateScore(user.address, 1500))
      .to.emit(registry, 'ScoreUpdated')
      .withArgs(user.address, 1500);
    const profile = await registry.profiles(user.address);
    expect(profile.ethosScore).to.equal(1500);
  });

  it('rejects score updates from unauthorized callers (no forgery)', async () => {
    const { registry, attacker, user } = await deploy();
    await expect(
      registry.connect(attacker).updateScore(user.address, 999999),
    ).to.be.revertedWith('Unauthorized');
    const profile = await registry.profiles(user.address);
    expect(profile.ethosScore).to.equal(0);
  });

  it('lets the owner grant and revoke authorization', async () => {
    const { registry, owner, updater, user } = await deploy();

    await expect(registry.connect(owner).setAuthorized(updater.address, true))
      .to.emit(registry, 'AuthorizationChanged')
      .withArgs(updater.address, true);
    await registry.connect(updater).updateScore(user.address, 1200);
    expect((await registry.profiles(user.address)).ethosScore).to.equal(1200);

    await registry.connect(owner).setAuthorized(updater.address, false);
    await expect(
      registry.connect(updater).updateScore(user.address, 1),
    ).to.be.revertedWith('Unauthorized');
  });

  it('only the owner can manage authorization', async () => {
    const { registry, attacker } = await deploy();
    await expect(
      registry.connect(attacker).setAuthorized(attacker.address, true),
    ).to.be.revertedWith('Not owner');
  });

  it('supports ownership transfer', async () => {
    const { registry, owner, updater } = await deploy();
    await expect(registry.connect(owner).transferOwnership(updater.address))
      .to.emit(registry, 'OwnershipTransferred')
      .withArgs(owner.address, updater.address);
    expect(await registry.owner()).to.equal(updater.address);
  });
});
