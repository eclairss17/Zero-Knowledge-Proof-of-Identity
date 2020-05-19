var Verifier = artifacts.require('DateVerifier')

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
        
        I = [4]

        let tx = await this.contract.verifyTx(A, A_p, B, B_p, C, C_p, H, K, I)
        assert.equal(tx.logs.length, 0)
    })


    it('passes for right values', async function () { 

        let proof = {
            "proof":
            {
                "A":["0x2ad29f6dbb99e5f6541c2ab4b10db864a66ade30ed5e8630e3cac464086df03", "0x12290544a872c22789875c32925d1287c4a9f108818e155cd27c9c389ce2ac0e"],
                "A_p":["0xf7520579ba590f8049b08129343f0aa66b1c21246a9d278a15ef953bba24b9", "0x2aa502faae6f192f485cd55883e83f8a3ff760618762709083a72d57b07e7250"],
                "B":
                    [["0x288d4f9c8fee7b0e16268bb4b2af4d9c15d3384659315604702ad1586d5427e1", "0x26dc7ea8afd25bc0edb632b064ffea279e51d0575f81f02cf9e2bed973e03c34"], ["0x1f3dae8d5f7a82e537fde70ba8612b945e7766709821de088e65030e7df8b6f3", "0x36b4202fda87239221d99910af40a75a6f091d6773daaaa5c202c0b3f4bdb5d"]],
                
                "B_p":["0x2bdc7d80019890b7cd4b62dfce2b2b6894aecf43f534e9635cb55fca63b02f0d", "0x19c5010204425124bea0d06e52ee1c5a03f2bebf1d9c885ded842f1ebe449714"],
                "C":["0x1495687be1eb5eda951da181da1556db76b542f8347fb8f7ba9909a16bb8ef6c", "0x1a078fcf12afc73810a6f4642664c62429a9f9c46a3affe830842630bbe8cf9"],
                "C_p":["0x11924e20d27e54073e1aaa4413457218cc45b4de91dfaa37cee0c3ed3a7370ca", "0x19a38f06108d409c324e25c9075a705d281797dc54955f6cb47d2354ae1a4d1"],
                "H":["0x2b2133930541f502bac062411c1b38cfdf88278cb20143d75b0ac0f3f70064b9", "0xab48fec9164d575c2eac2cfbe1b40eaa19a843f34445de520ecdd98fa43b558"],
                "K":["0x23e24d660659ef39ae4113d7b0a3e34da1014d2d0528833823d7b4891c292017", "0x1193bac0f2550b097ba5490081fc93c6e8c4adda754ab1c11f13b4c9f6d92314"]
            },
            "input":[1]
        }

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
