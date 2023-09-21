// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CombinedTribunalNFT is ERC721, Ownable {
    struct TheftCase {
        address thief;
        address victim;
        uint256 stolenAmount;
        bool resolved;
    }

    struct TribunalDetails {
        string caseDescription;
        address plaintiff;
        address defendant;
        uint256 stolenFundsAmount;
        string legalProceedings;
        bool isResolved;
        string[] milestones;
        bool fundsLocked;
        address fundsBeneficiary;
    }

    struct Proposal {
        uint256 tokenId; // Added tokenId field
        string description;
        address creator;
        uint votes;
        bool isExecuted;
        bool isOpen;
    }

    mapping(uint256 => TheftCase) public theftCases;
    mapping(uint256 => TribunalDetails) public tribunalDetails;
    mapping(uint256 => Proposal) public proposals;

    uint256 public caseCounter;
    uint256 public tokenIdCounter;
    uint256 public proposalCounter;

    // Mapping to store valid addresses that can make certain decisions
    mapping(address => bool) public validAddresses;

    // Modifier to check if the caller is a valid address
    modifier onlyValidAddress() {
        require(validAddresses[msg.sender], "Caller is not a valid address");
        _;
    }

    constructor() ERC721("CombinedTribunalNFT", "CTN") {
        caseCounter = 1;
        tokenIdCounter = 1;
        proposalCounter = 1;
    }

    // Function to add a valid address (only owner)
    function addValidAddress(address _address) external onlyOwner {
        validAddresses[_address] = true;
    }

    // Function to remove a valid address (only owner)
    function removeValidAddress(address _address) external onlyOwner {
        validAddresses[_address] = false;
    }

    // Create a new theft case
    function createTheftCase(address _thief, address _victim, uint256 _stolenAmount) external {
        require(_stolenAmount > 0, "Stolen amount must be greater than 0");
        _mint(msg.sender, caseCounter);
        theftCases[caseCounter] = TheftCase(_thief, _victim, _stolenAmount, false);
        caseCounter++;
    }

    // Create a new Tribunal NFT
    function createTribunalNFT(
        string memory _caseDescription,
        address _plaintiff,
        address _defendant,
        uint256 _stolenFundsAmount,
        string memory _legalProceedings
    ) external onlyOwner {
        _mint(msg.sender, tokenIdCounter);

        tribunalDetails[tokenIdCounter] = TribunalDetails({
            caseDescription: _caseDescription,
            plaintiff: _plaintiff,
            defendant: _defendant,
            stolenFundsAmount: _stolenFundsAmount,
            legalProceedings: _legalProceedings,
            isResolved: false,
            milestones: new string[](0),
            fundsLocked: true,
            fundsBeneficiary: address(0)
        });

        tokenIdCounter++;
    }

    // Resolve a theft case (only owner of the NFT)
    function resolveTheftCase(uint256 _tokenId) external onlyValidAddress {
        require(ownerOf(_tokenId) == msg.sender, "Only the owner can resolve a case");
        require(!theftCases[_tokenId].resolved, "The case is already resolved");
        theftCases[_tokenId].resolved = true;
    }

    // Add a milestone to a Tribunal NFT
    function addMilestone(uint256 _tokenId, string memory _milestone) external onlyValidAddress {
        TribunalDetails storage details = tribunalDetails[_tokenId];
        require(!details.isResolved, "Tribunal is already resolved");
        details.milestones.push(_milestone);
    }

    // Unlock funds and specify the beneficiary for a Tribunal NFT
    function unlockFunds(uint256 _tokenId, address _beneficiary) external onlyValidAddress {
        TribunalDetails storage details = tribunalDetails[_tokenId];
        require(!details.isResolved, "Tribunal is already resolved");
        require(details.fundsLocked, "Funds are already unlocked");
        details.fundsBeneficiary = _beneficiary;
        details.fundsLocked = false;
    }

    // Mark a Tribunal as resolved and automatically transfer funds if unlocked
    function markTribunalResolved(uint256 _tokenId) external onlyValidAddress {
        TribunalDetails storage details = tribunalDetails[_tokenId];
        require(!details.isResolved, "Tribunal is already resolved");
        details.isResolved = true;

        // Check if funds are locked and a beneficiary is specified
        if (!details.fundsLocked && details.fundsBeneficiary != address(0)) {
            // Automatically transfer funds to the beneficiary
            payable(details.fundsBeneficiary).transfer(details.stolenFundsAmount);
        }
    }
    
    // Function to approve a case and transfer funds to the owner
    function approveCase(uint256 _tokenId) external onlyValidAddress {
        require(ownerOf(_tokenId) == msg.sender, "Only the owner can approve a case");
        require(!theftCases[_tokenId].resolved, "The case is already resolved");

        // Transfer the stolen funds to the owner of the case
        address ownerOfCase = ownerOf(_tokenId);
        uint256 stolenFunds = tribunalDetails[_tokenId].stolenFundsAmount;
        payable(ownerOfCase).transfer(stolenFunds);

        // Mark the case as resolved
        theftCases[_tokenId].resolved = true;
    }

    // Function to reject a case and return funds to the falsely accused
    function rejectCase(uint256 _tokenId) external onlyValidAddress {
        require(ownerOf(_tokenId) == msg.sender, "Only the owner can reject a case");
        require(!theftCases[_tokenId].resolved, "The case is already resolved");

        // Transfer the stolen funds back to the falsely accused
        address defendant = tribunalDetails[_tokenId].defendant;
        uint256 stolenFunds = tribunalDetails[_tokenId].stolenFundsAmount;
        payable(defendant).transfer(stolenFunds);

        // Mark the case as resolved
        theftCases[_tokenId].resolved = true;
    }

    // Event for reporting ownership theft
    event OwnershipTheftReported(uint256 tokenId, address thief);

    // Event for reporting token theft
    event TokenTheftReported(uint256 tokenId, address thief);

    // Event for reporting asset theft
    event AssetTheftReported(uint256 tokenId, address thief);

    // Event for creating a new proposal
    event ProposalCreated(uint256 proposalId, uint256 tokenId, string description);

    // Event for voting on a proposal
    event VotedOnProposal(uint256 proposalId, address voter, uint256 votes);

    // Function to report ownership theft
    function reportOwnershipTheft(uint256 _tokenId, address _thief) external {
        require(ownerOf(_tokenId) == msg.sender, "Only the owner can report ownership theft");
        TheftCase storage theftCase = theftCases[_tokenId];
        require(!theftCase.resolved, "Theft case is already resolved");

        // Mark the theft case as resolved and emit an event
        theftCase.resolved = true;
        emit OwnershipTheftReported(_tokenId, _thief);
    }

    // Function to report token theft
    function reportTokenTheft(uint256 _tokenId, address _thief) external onlyValidAddress {
        TheftCase storage theftCase = theftCases[_tokenId];
        require(!theftCase.resolved, "Theft case is already resolved");

        // Mark the theft case as resolved and emit an event
        theftCase.resolved = true;
        emit TokenTheftReported(_tokenId, _thief);
    }

    // Function to report asset theft (for non-token assets)
    function reportAssetTheft(uint256 _tokenId, address _thief) external onlyOwner {
        require(ownerOf(_tokenId) == msg.sender, "Only the owner can report asset theft");
        TheftCase storage theftCase = theftCases[_tokenId];
        require(!theftCase.resolved, "Theft case is already resolved");

        // Mark the theft case as resolved and emit an event
        theftCase.resolved = true;
        emit AssetTheftReported(_tokenId, _thief);
    }

    // Function to create a new proposal
    function createProposal(uint256 _tokenId, string memory _description) external onlyValidAddress {
        require(ownerOf(_tokenId) == msg.sender, "Only the owner can create a proposal");
        Proposal storage newProposal = proposals[proposalCounter];
        newProposal.tokenId = _tokenId; // Set the tokenId for the proposal
        newProposal.description = _description;
        newProposal.creator = msg.sender;
        newProposal.votes = 0;
        newProposal.isExecuted = false;
        newProposal.isOpen = true;
        proposalCounter++;

        emit ProposalCreated(proposalCounter - 1, _tokenId, _description);
    }

    // Function to vote on a proposal
    function voteOnProposal(uint256 _proposalId) external onlyValidAddress {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.isOpen, "Proposal is not open for voting");
        require(ownerOf(proposal.tokenId) != msg.sender, "Owner cannot vote on their own proposal");
        proposal.votes++;
        emit VotedOnProposal(_proposalId, msg.sender, proposal.votes);
    }

    // Function to close and execute a proposal (only owner of the NFT)
    function closeAndExecuteProposal(uint256 _proposalId) external onlyOwner {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.isOpen, "Proposal is not open");
        proposal.isOpen = false;
        if (proposal.votes > 0) {
            proposal.isExecuted = true;
            // Implement the logic for executing the proposal here
            // In your specific use case, you can define the actions that should be taken based on the proposal.
        }
    }
}