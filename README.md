# Zero-Knowledge-Proof-of-Identity

 Identity Age Verification using Zero Knowledge proof on Zokrates 



AgeVerification.code is my Zokrates function for Identity Age Verification. The technical term is self sovereign identity Verification using Zero Knowledge proof
It has both public and private inputs. 

E(Var) : Encrypted variable

My E(name), E(current age (proves if I am above 18)) consist of my public inputs. And my E(DOB) and E(key) consist of my private inputs whose knowledge I want to prove using ZKP. So given my private inputs DOB in epoch time, even if a third witness is aware of the three parameters  i.e. name, age and DOB; it still ensures that the prover is honest given only the prover knows the second private input i.e. the security key which is unique to the prover. 

This Zero knowledge proof has a small Dapp that issues a NonFungibile ERC721 token(magic coin) to the prover after successfully validating the verifier challenge that is the successful transaction of verifyTx function in AgeVerifier.sol . Practically since zkSnarks is non-interactive the verifier listens to the 'Verified' event to become aware that the prover has successfully solved the problem.
