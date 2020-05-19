var NFTPrize = artifacts.require('NFTPrize')

var AgeVerifier = artifacts.require('AgeVerifier')
//var MagicVerifier = artifacts.require('MagicVerifier')
var BN = web3.utils.BN;
contract('NFTPrize', accounts => { 

    let tokenImageForAddingTen = 'https://i.imgur.com/bHVMwAj.png'
   // let tokenImageForMagicNumber = 'https://i.imgur.com/Ye7YFfX.png'

    beforeEach(async function () { 
        this.verifierContract = await AgeVerifier.new({from: accounts[0]})
      //  this.magicVerifierContract = await MagicVerifier.new({from: accounts[0]})

        this.contract = await NFTPrize.new(this.verifierContract.address, {from: accounts[0]})

        await this.contract.addPuzzle(this.verifierContract.address, tokenImageForAddingTen)
        //await this.contract.addPuzzle(this.magicVerifierContract.address, tokenImageForMagicNumber)
    })

    it('can add a new puzzle', async function () { 
        let verifierContract = await AgeVerifier.new({from: accounts[0]})
        let tx = await this.contract.addPuzzle(verifierContract.address, 'test')

        assert.equal(tx.logs[0].event, 'PuzzleAdded')
        assert.equal(tx.logs[0].args.addr, verifierContract.address)
        assert.equal(tx.logs[0].args.tokenImage, 'test')
        assert.equal(new BN(tx.logs[0].args.puzzleId).toNumber(), 1)
    })

    it('mints a token if you got the answer right!', async function () {

        let proof = {
            
        "proof":
        {
            "A":["0x2ef57224d7c7ec3ff117489ce7f3db737f9d3957f3b493187e7862ee21876755", "0x221adc52ed573126bf87c63a212df59678c686b4d4eb5b41f2794397a6fd7e28"],
            "A_p":["0x29f9646cbed27b5e56dc935f2aab2574fe316b9bf5172273bb274302ee164a88", "0x1dd007400dc982ce9a7031952c20f9dde8bcff1df10030267dcd27e596135144"],
            "B":
                [["0xfa89e60c89d45e16ef091ef9cb1241aaa0a3db7cec071fdac635dd367d0ffa6", "0x1171c04d432df0281fcd843e4ebcc27e12f272c48df1f833e82fd277e76aa452"], ["0x2df782fc4ca63f96d10bc6c8d7355aad19c2f56114b1405fd2a73b094ec6983", "0x8b5bde01c7f69875f155a85405b4d85562067e909ebf07d8dce0acf56496061"]],
            
            "B_p":["0x26cd044377d1c4ff7da35e23fddf81edacc8c5f80f1b7c2e23649bcd3af89899", "0x115baebbf4a34ebbd1b5af1b77e213ddd7b552537512344d3d1636f7446830a3"],
            "C":["0x2db5e9cf0805077bcbb58cb730bf09a3b297fee54de34e3c692cea46246247cf", "0x271880a93f8704608222470f639d815151213422c337039b422b1144471b0bd0"],
            "C_p":["0x25f7a8307900b0409bd0f1733679a92a996fd4f60244d75ac32832d9d7f827f0", "0x177750495349a4a514a4288a432d3a9b3333aeda0d9bbde098ff14a8f029ed9f"],
            "H":["0x2d1a6c54a15f72604e988d5437e20ddcc83af6987a80e10633c131bb3e160ea4", "0xb77f08ab67983c8bb501791062a49ffd0b2f1a580296188014aa925f3c77f00"],
            "K":["0x1d1ecf915ecf7eaa39431312255b21c9b5eec19e5f79d212887763901068f0c5", "0x18c59e04a7f97231b9204fbf922016cc0d592b4e910e82e7f5e0c034a72e5609"]
        },
        "input":["69107108101101110327597117114",20,1]
        }

        let tx = await this.contract.mint(
            proof.proof.A, 
            proof.proof.A_p, 
            proof.proof.B, 
            proof.proof.B_p, 
            proof.proof.C, 
            proof.proof.C_p, 
            proof.proof.H, 
            proof.proof.K, 
            proof.input,
            0, 
        {from: accounts[1]})
    
        assert.equal(tx.logs[0].args.tokenId, 1)    
        assert.equal(await this.contract.ownerOf(1), accounts[1])
        assert.equal(await this.contract.tokenURI(1), tokenImageForAddingTen)
    })

   /* it('mints a token if you got the answer right!', async function () {

        let proof = {
            "proof":
            {
                "A":["0x1a9360ccd98f6d6ce0e9958d83196ee2f08a33f698bcfd3b9cb4178baa1ee556", "0x25db4af5af9b8392121284c716b17c6cc801d369f47b5ceff28ae3221ba8f617"],
                "A_p":["0x262f212854c159fda72bfec1e690cba826f13e242945c3501c1860bfbf7a1cf8", "0x2c81c8ce51b01806f0ac0b855a1ac56faac183fdbc1994ba3c61cc48e97408aa"],
                "B":
                    [["0x1909f796987105ad1efe345a6f80288664b992299e2badcb8e36d6fd7843460f", "0x183c9bc8a9b07f1d005530e09d40307150d1408605b240817f3f014b2b0c922d"], ["0x121dfc02e66f955be081fbb0b23cd59e38c4b69c6ad7eeb9551173d7a2cccc30", "0x81eaec6c58c458f375120feec1f0ccd00149aea7955842c474812e9f5497f1e"]],
                
                "B_p":["0x18238c1e2e48e4731820e03908dc593e95f76d12ce6c32ff6b7bd67cc3d44382", "0xc6c87902a3ed8c348963dcfaef40f33f5ea7d2b634a5ed5cdcacaac14b58e4f"],
                "C":["0xb229ee67f6d5b739c0f22aa970aab60170c2799694ea992d238f0bfc480dc0f", "0x16f35ef1f6333eba6cadddf383d6d2ad81fc186029a5f8615d6692e75b9dd39"],
                "C_p":["0xc64f421617c1c18affaa975c7d7632259c4afb7980d8b25e4574517eede0769", "0x1abdfd6d021a3e313fba0b40cc97a5709bdd12db31b708a9da8aded1ac9fa837"],
                "H":["0x2eb4d8b1bad1e9a2f215fafefaf8c1bf4c7987f0a394db048a5695e4a3874acf", "0x29cd9bcdf33731d4ba5c5ea74abcf2f961b12682cf4907dd3cdc66c335cd416c"],
                "K":["0x15710993ae81311bb359f94738eff034e9cc4f58ed784a231824f47aff4445e6", "0x1ec2a886f4e6c6d848e99649a7f44c0894baf071ea45045d96b80d63803876c5"]
            },
            "input":[1]
        }

        let tx = await this.contract.mint(
            proof.proof.A, 
            proof.proof.A_p, 
            proof.proof.B, 
            proof.proof.B_p, 
            proof.proof.C, 
            proof.proof.C_p, 
            proof.proof.H, 
            proof.proof.K, 
            proof.input,
            1, 
        {from: accounts[1]})
    
        assert.equal(tx.logs[0].args.tokenId, 1)    
        assert.equal(await this.contract.ownerOf(1), accounts[1])
        assert.equal(await this.contract.tokenURI(1), tokenImageForMagicNumber)
    })*/
})
