const Token = artifacts.require("Token");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Token', ([deployer, account, account2]) => {
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
        it('should send tokens', async() => {
            const sendTokens = await token.sendTokens(10000, account, {from: deployer});
            const balanceSender = await token.balances(deployer);
            const balanceAccount = await token.balances(account);
            assert.equal(balanceSender.toString(), 10000000000000000000-10000);
            assert.equal(balanceAccount.toString(), 10000);
            await token.sendTokens(10001, deployer, {from: account}).should.be.rejected;
        })
        it('should buy tokens', async() => {
            const buyTokens = await token.buyTokens({from: account2, value: 100});
            const balanceAccount2 = await token.balances(account2);
            assert.equal(balanceAccount2.toString(), 100)
            await token.buyTokens({from: account2, value: 10000000000000000000000}).should.be.rejected;
        })
    })
})
