const { ethers, upgrades } = require("hardhat");
const { expect } = require("chai");

describe("IodineToken", function () {
    let iodineToken;
    let owner;
    let minter;
    let beneficiary;

    beforeEach(async function () {
        [owner, minter, beneficiary] = await ethers.getSigners();

        // Deploy the IodineToken contract
        const IodineToken = await ethers.getContractFactory("IodineToken");
        iodineToken = await upgrades.deployProxy(IodineToken, ["Iodine Token", "IDN"]);
        await iodineToken.deployed();

        // Add the minter role to the minter address
        await iodineToken.addMinter(minter.address);
    });

    it("should deploy with the correct name and symbol", async function () {
        const name = await iodineToken.name();
        const symbol = await iodineToken.symbol();

        expect(name).to.equal("Iodine Token");
        expect(symbol).to.equal("IDN");
    });

    it("should allow minters to mint new tokens", async function () {
        const initialBalance = await iodineToken.balanceOf(beneficiary.address);
        const amountToMint = ethers.utils.parseEther("100");

        // Mint tokens as the minter
        await iodineToken.connect(minter).mint(beneficiary.address, amountToMint);

        const finalBalance = await iodineToken.balanceOf(beneficiary.address);
        expect(finalBalance).to.equal(initialBalance.add(amountToMint));
    });

    it("should allow the owner to burn tokens", async function () {
        const initialBalance = await iodineToken.balanceOf(owner.address);
        const amountToBurn = ethers.utils.parseEther("100");

        // Burn tokens as the owner
        await iodineToken.connect(owner).burn(amountToBurn);

        const finalBalance = await iodineToken.balanceOf(owner.address);
        expect(finalBalance).to.equal(initialBalance.sub(amountToBurn));
    });

    it("should create a vesting schedule", async function () {
        const startTimestamp = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
        const cliffDuration = 30 * 86400; // 30 days
        const vestingDuration = 180 * 86400; // 180 days
        const totalAmount = ethers.utils.parseEther("1000000");

        await iodineToken.connect(owner).createVestingSchedule(
            beneficiary.address,
            startTimestamp,
            cliffDuration,
            vestingDuration,
            totalAmount
        );

        const vestingSchedule = await iodineToken.vestingSchedules(beneficiary.address);
        expect(vestingSchedule.startTimestamp).to.equal(startTimestamp);
        expect(vestingSchedule.cliffDuration).to.equal(cliffDuration);
        expect(vestingSchedule.vestingDuration).to.equal(vestingDuration);
        expect(vestingSchedule.totalAmount).to.equal(totalAmount);
        expect(vestingSchedule.releasedAmount).to.equal(0);
    });

    it("should release vested tokens", async function () {
        const startTimestamp = Math.floor(Date.now() / 1000) - 86400; // Yesterday
        const cliffDuration = 30 * 86400; // 30 days
        const vestingDuration = 180 * 86400; // 180 days
        const totalAmount = ethers.utils.parseEther("1000000");

        await iodineToken.connect(owner).createVestingSchedule(
            beneficiary.address,
            startTimestamp,
            cliffDuration,
            vestingDuration,
            totalAmount
        );

        const vestedAmount = await iodineToken.calculateVestedAmount(beneficiary.address);
        const initialBalance = await iodineToken.balanceOf(beneficiary.address);

        // Advance time to the end of the cliff period
        await ethers.provider.send("evm_increaseTime", [cliffDuration]);
        await ethers.provider.send("evm_mine");

        // Release vested tokens
        await iodineToken.connect(beneficiary).releaseVestedTokens();

        const finalBalance = await iodineToken.balanceOf(beneficiary.address);
        expect(finalBalance).to.equal(initialBalance.add(vestedAmount));
    });

    it("should prevent transferring more tokens than vested", async function () {
        const startTimestamp = Math.floor(Date.now() / 1000) - 86400; // Yesterday
        const cliffDuration = 30 * 86400; // 30 days
        const vestingDuration = 180 * 86400; // 180 days
        const totalAmount = ethers.utils.parseEther("1000000");

        await iodineToken.connect(owner).createVestingSchedule(
            beneficiary.address,
            startTimestamp,
            cliffDuration,
            vestingDuration,
            totalAmount
        );

        const vestedAmount = await iodineToken.calculateVestedAmount(beneficiary.address);

        // Attempt to transfer more tokens than vested
        const transferAmount = vestedAmount.add(ethers.utils.parseEther("1"));
        await expect(iodineToken.connect(beneficiary).transfer(owner.address, transferAmount)).to.be.revertedWith(
            "Transfer amount exceeds vested balance"
        );
    });

    it("should report ownership theft", async function () {
        const thief = ethers.Wallet.createRandom().address;

        await iodineToken.reportOwnershipTheft(thief);

        const hasReportedTheft = await iodineToken.ownershipTheftReports(thief);
        expect(hasReportedTheft).to.equal(true);
    });

    it("should report token theft", async function () {
        const thief = ethers.Wallet.createRandom().address;

        await iodineToken.reportTokenTheft(thief);

        const hasReportedTheft = await iodineToken.tokenTheftReports(thief);
        expect(hasReportedTheft).to.equal(true);
    });

    it("should report asset theft", async function () {
        const thief = ethers.Wallet.createRandom().address;

        await iodineToken.reportAssetTheft(thief);

        const hasReportedTheft = await iodineToken.assetTheftReports(thief);
        expect(hasReportedTheft).to.equal(true);
    });
});
