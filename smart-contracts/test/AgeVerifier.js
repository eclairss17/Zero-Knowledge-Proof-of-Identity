var Verifier = artifacts.require('AgeVerifier')

contract('Verifier', accounts => { 
    beforeEach(async function() { 
        this.contract = await Verifier.new({from: accounts[0]})
    })

    it('Does not pass for wrong values', async function () { 
        A = [1, 2]
        A_p = [1, 2]
        B = [[1, 2], [1, 2]]
        B_p = [1, 2]
        C = [1, 2]
        C_p = [1, 2]
        H = [1, 2]
        K = [1, 2]
        
        I = [4,8,8]

        let tx = await this.contract.verifyTx(A, A_p, B, B_p, C, C_p, H, K, I)
        assert.equal(tx.logs.length, 0)
    })


    it('passes for right values', async function () { 

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
//If you are using a big number for input wrap it in double quotes, JavaScript doesn't support Big Number
        let tx = await this.contract.verifyTx(
            proof.proof.A, 
            proof.proof.A_p, 
            proof.proof.B, 
            proof.proof.B_p, 
            proof.proof.C, 
            proof.proof.C_p, 
            proof.proof.H, 
            proof.proof.K, 
            proof.input
        )
    
        assert.equal(tx.logs[0].event, 'Verified')
    })
})
