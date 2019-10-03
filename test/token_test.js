const Token = artifacts.require("Token")

contract('Token', ([deployer, account]) => {
    let token;
    before(async() => {
        token = await Token.deployed();
    })
    describe('initial', async() => {
        it('Should be initialized properly', async() => {
            assert.notEqual(token.address, 0x0);

            const balance = await token.balances(deployer)
            assert.equal(balance.toString(),10000000000000000000)
        })
    })
    describe('other tests', async() => {
        it('should send tokens' async() => {

        })
        it('should buy tokens' async() => {

        })
    })
})
