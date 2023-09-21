const { ethers } = require("hardhat");
const { Contract, Signer } = require("ethers");
const { expect } = require("chai");

describe("CombinedTribunalNFT", function () {
    let contract;
    let owner;
    let thief;
    let victim;

    beforeEach(async function () {
        const [ownerSigner, thiefSigner, victimSigner] = await ethers.getSigners();
        owner = ownerSigner;
        thief = thiefSigner;
        victim = victimSigner;

        const CombinedTribunalNFT = await ethers.getContractFactory("CombinedTribunalNFT");
        contract = await CombinedTribunalNFT.deploy();
        await contract.deployed();
    });

    it("should create a new theft case", async function () {
        const thiefAddress = await thief.getAddress();
        const victimAddress = await victim.getAddress();
        const stolenAmount = ethers.utils.parseEther("1");

        await contract.connect(victim).createTheftCase(thiefAddress, victimAddress, stolenAmount);

        const theftCase = await contract.theftCases(1);
        expect(await theftCase.thief).to.equal(thiefAddress);
        expect(await theftCase.victim).to.equal(victimAddress);
        expect(await theftCase.stolenAmount).to.equal(stolenAmount);
        expect(await theftCase.resolved).to.equal(false);
    });

    it("should create a new Tribunal NFT", async function () {
        const caseDescription = "Test Case";
        const stolenFundsAmount = ethers.utils.parseEther("1");
        const legalProceedings = "Legal Proceedings";

        await contract.connect(owner).createTribunalNFT(
            caseDescription,
            await plaintiff.getAddress(),
            await defendant.getAddress(),
            stolenFundsAmount,
            legalProceedings
        );

        const tribunalDetails = await contract.tribunalDetails(1);
        expect(await tribunalDetails.caseDescription).to.equal(caseDescription);
        expect(await tribunalDetails.plaintiff).to.equal(await plaintiff.getAddress());
        expect(await tribunalDetails.defendant).to.equal(await defendant.getAddress());
        expect(await tribunalDetails.stolenFundsAmount).to.equal(stolenFundsAmount);
        expect(await tribunalDetails.legalProceedings).to.equal(legalProceedings);
        expect(await tribunalDetails.isResolved).to.equal(false);
        expect(await tribunalDetails.fundsLocked).to.equal(true);
        expect(await tribunalDetails.fundsBeneficiary).to.equal(ethers.constants.AddressZero);
    });

    it("should resolve a theft case", async function () {
        const thiefAddress = await thief.getAddress();
        const victimAddress = await victim.getAddress();
        const stolenAmount = ethers.utils.parseEther("1");

        await contract.connect(victim).createTheftCase(thiefAddress, victimAddress, stolenAmount);

        await contract.connect(victim).resolveTheftCase(1);

        const theftCase = await contract.theftCases(1);
        expect(await theftCase.resolved).to.equal(true);
    });

    it("should add a milestone to a Tribunal NFT", async function () {
        const caseDescription = "Test Case";
        const stolenFundsAmount = ethers.utils.parseEther("1");
        const legalProceedings = "Legal Proceedings";

        await contract.connect(owner).createTribunalNFT(
            caseDescription,
            await plaintiff.getAddress(),
            await defendant.getAddress(),
            stolenFundsAmount,
            legalProceedings
        );

        const milestone = "Reached a settlement";

        await contract.connect(owner).addMilestone(1, milestone);

        const tribunalDetails = await contract.tribunalDetails(1);
        expect(await tribunalDetails.milestones).to.deep.equal([milestone]);
    });

    it("should unlock funds and specify the beneficiary for a Tribunal NFT", async function () {
        const caseDescription = "Test Case";
        const stolenFundsAmount = ethers.utils.parseEther("1");
        const legalProceedings = "Legal Proceedings";

        await contract.connect(owner).createTribunalNFT(
            caseDescription,
            await plaintiff.getAddress(),
            await defendant.getAddress(),
            stolenFundsAmount,
            legalProceedings
        );

        const beneficiary = await owner.getAddress();

        await contract.connect(owner).unlockFunds(1, beneficiary);

        const tribunalDetails = await contract.tribunalDetails(1);
        expect(await tribunalDetails.fundsLocked).to.equal(false);
        expect(await tribunalDetails.fundsBeneficiary).to.equal(beneficiary);
    });

    it("should mark a Tribunal as resolved and transfer funds if unlocked", async function () {
        const caseDescription = "Test Case";
        const stolenFundsAmount = ethers.utils.parseEther("1");
        const legalProceedings = "Legal Proceedings";

        await contract.connect(owner).createTribunalNFT(
            caseDescription,
            await plaintiff.getAddress(),
            await defendant.getAddress(),
            stolenFundsAmount,
            legalProceedings
        );

        const beneficiary = await owner.getAddress();

        await contract.connect(owner).unlockFunds(1, beneficiary);
        await contract.connect(owner).markTribunalResolved(1);

        const tribunalDetails = await contract.tribunalDetails(1);
        expect(await tribunalDetails.isResolved).to.equal(true);

        const beneficiaryBalance = await ethers.provider.getBalance(beneficiary);
        expect(beneficiaryBalance).to.equal(stolenFundsAmount);
    });

    it("should approve a theft case and transfer funds to the owner", async function () {
        const thiefAddress = await thief.getAddress();
        const victimAddress = await victim.getAddress();
        const stolenAmount = ethers.utils.parseEther("1");

        await contract.connect(victim).createTheftCase(thiefAddress, victimAddress, stolenAmount);

        const ownerAddress = await owner.getAddress();
        const tokenId = 1;
        const initialBalance = await ethers.provider.getBalance(ownerAddress);

        await contract.connect(owner).approveCase(tokenId);

        const theftCase = await contract.theftCases(tokenId);
        expect(await theftCase.resolved).to.equal(true);

        const finalBalance = await ethers.provider.getBalance(ownerAddress);
        expect(finalBalance).to.gt(initialBalance); // Owner's balance should increase
    });

    it("should reject a theft case and return funds to the falsely accused", async function () {
        const thiefAddress = await thief.getAddress();
        const victimAddress = await victim.getAddress();
        const stolenAmount = ethers.utils.parseEther("1");

        await contract.connect(victim).createTheftCase(thiefAddress, victimAddress, stolenAmount);

        const defendantAddress = await defendant.getAddress();
        const tokenId = 1;
        const initialBalance = await ethers.provider.getBalance(defendantAddress);

        await contract.connect(owner).rejectCase(tokenId);

        const theftCase = await contract.theftCases(tokenId);
        expect(await theftCase.resolved).to.equal(true);

        const finalBalance = await ethers.provider.getBalance(defendantAddress);
        expect(finalBalance).to.gt(initialBalance); // Defendant's balance should increase
    });

    it("should add and vote on a proposal", async function () {
        const caseDescription = "Test Case";
        const stolenFundsAmount = ethers.utils.parseEther("1");
        const legalProceedings = "Legal Proceedings";

        await contract.connect(owner).createTribunalNFT(
            caseDescription,
            await plaintiff.getAddress(),
            await defendant.getAddress(),
            stolenFundsAmount,
            legalProceedings
        );

        const tokenId = 1;
        const description = "Execute the proposal";

        await contract.connect(owner).createProposal(tokenId, description);

        const proposalId = 1;
        await contract.connect(thief).voteOnProposal(proposalId);

        const proposal = await contract.proposals(proposalId);
        expect(await proposal.votes).to.equal(1);
    });

    it("should close and execute a proposal", async function () {
        const caseDescription = "Test Case";
        const stolenFundsAmount = ethers.utils.parseEther("1");
        const legalProceedings = "Legal Proceedings";

        await contract.connect(owner).createTribunalNFT(
            caseDescription,
            await plaintiff.getAddress(),
            await defendant.getAddress(),
            stolenFundsAmount,
            legalProceedings
        );

        const tokenId = 1;
        const description = "Execute the proposal";

        await contract.connect(owner).createProposal(tokenId, description);

        const proposalId = 1;
        await contract.connect(owner).closeAndExecuteProposal(proposalId);

        const proposal = await contract.proposals(proposalId);
        expect(await proposal.isOpen).to.equal(false);
        expect(await proposal.isExecuted).to.equal(true);
        // Implement additional checks for the specific actions taken when executing a proposal
    });

    it("should close and execute a proposal", async function () {
        const caseDescription = "Test Case";
        const stolenFundsAmount = ethers.utils.parseEther("1");
        const legalProceedings = "Legal Proceedings";

        await contract.connect(owner).createTribunalNFT(
            caseDescription,
            await plaintiff.getAddress(),
            await defendant.getAddress(),
            stolenFundsAmount,
            legalProceedings
        );

        const tokenId = 1;
        const description = "Execute the proposal";

        await contract.connect(owner).createProposal(tokenId, description);

        const proposalId = 1;

        // Ensure that proposal execution fails when it's not closed
        await expect(contract.connect(owner).executeProposal(proposalId)).to.be.revertedWith(
            "Proposal is not closed"
        );

        // Close the proposal
        await contract.connect(owner).closeProposal(proposalId);

        // Ensure that executing the proposal fails when it's not approved
        await expect(contract.connect(owner).executeProposal(proposalId)).to.be.revertedWith(
            "Proposal is not approved"
        );

        // Approve the proposal
        await contract.connect(thief).voteOnProposal(proposalId);
        await contract.connect(owner).closeProposal(proposalId);

        // Execute the proposal
        await contract.connect(owner).executeProposal(proposalId);

        const proposal = await contract.proposals(proposalId);
        expect(await proposal.isOpen).to.equal(false);
        expect(await proposal.isExecuted).to.equal(true);

        // Implement additional checks for the specific actions taken when executing a proposal
        const tribunalDetails = await contract.tribunalDetails(tokenId);
        expect(await tribunalDetails.fundsLocked).to.equal(false);
        expect(await tribunalDetails.fundsBeneficiary).to.equal(owner.address);

        // Ensure that funds are transferred to the specified beneficiary
        const ownerBalance = await ethers.provider.getBalance(owner.address);
        const expectedBalance = stolenFundsAmount;
        expect(ownerBalance).to.equal(expectedBalance);
    });
});
